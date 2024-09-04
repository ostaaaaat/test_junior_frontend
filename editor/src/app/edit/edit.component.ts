import { Component } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { Task } from '../model/task';
import { StorageService } from '../service/storage-service';
import { ItemCardComponent } from '../item-card/item-card.component';
import { BehaviorSubject } from 'rxjs';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})

export class EditComponent {
  private itemsSubject = new BehaviorSubject<Task[]>([]);
  items$ = this.itemsSubject.asObservable();

  constructor(private dialogService: NbDialogService, private storageService: StorageService) {
    const tasks = this.storageService.getTasks();
    this.itemsSubject.next(tasks);
  }

  openAddItemDialog() {
    this.dialogService.open(ItemCardComponent, {
      context: {
        readOnly: false
      }
    }).onClose.subscribe((newItem: Task) => {
      if (newItem) {
        const currentItems = this.itemsSubject.getValue();
        const newItems = [...currentItems, newItem];
        this.itemsSubject.next(newItems);
        this.storageService.updateTasks(this.itemsSubject.getValue());
      }
    });
  }

  handleCopy(item: Task) {
    const newItem = { ...item,  id: Task.uuid(), name: `${item.name} (копия)` };
    const currentItems = this.itemsSubject.getValue();
    this.itemsSubject.next([...currentItems, newItem]);
    this.storageService.updateTasks(this.itemsSubject.getValue());
  }

  handleDelete(id: string) {
    const updatedItems = this.itemsSubject.getValue().filter(i => i.id !== id);
    this.itemsSubject.next(updatedItems);
    this.storageService.updateTasks(updatedItems);
  }
}
