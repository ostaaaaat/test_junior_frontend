import { Component, Input } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { AddDialogComponent } from '../add-dialog/add-dialog.component';
import { Task } from '../model/task';
import { StorageService } from '../service/storage-service';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})

export class EditComponent {
  items: Task[] = [];

  constructor(private dialogService: NbDialogService, private storageSerice: StorageService) {
    this.items = storageSerice.getTasks();
  }

  openAddItemDialog() {
    this.dialogService.open(AddDialogComponent).onClose.subscribe(newItem => {
      if (newItem) {
        this.items.push(newItem);
      }
    });
  }

  handleCopy(item: any) {
    const newItem = { ...item, name: `${item.name} (копия)` };
    this.items.push(newItem);
  }

  handleDelete(item: any) {
    this.items = this.items.filter(i => i !== item);
    this.storageSerice.updateTasks(this.items)
  }
}
