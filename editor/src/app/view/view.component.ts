import { Component } from '@angular/core';
import { StorageService } from '../service/storage-service';
import { Task } from '../model/task';
import { NbDialogService } from '@nebular/theme';
import { ItemCardComponent } from '../item-card/item-card.component';
import { FormControl, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { NotificationService } from '../service/notification-service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent {

  private itemsSubject = new BehaviorSubject<Task[]>([]);
  items$ = this.itemsSubject.asObservable();

  allItems: Task[] = [];
  filterForm: FormGroup;

  constructor(private storageService: StorageService, private dialogService: NbDialogService, private notificationService: NotificationService) {
    this.notificationService.init();
    this.allItems = storageService.getTasks();
    this.itemsSubject.next([...this.allItems]);

    this.filterForm = new FormGroup({
      name: new FormControl<string | null>(null),
      dueDateFrom: new FormControl<moment.Moment | null>(null),
      dueDateTo: new FormControl<moment.Moment | null>(null)
    });
    this.filterForm.valueChanges.subscribe(value => {
      this.filterBy();
    });
  }

  filterBy() {
    let filteredItems = [...this.allItems];
    if (this.filterForm.value.name) {
      filteredItems = filteredItems.filter(task => task.name.includes(this.filterForm.value.name!));
    }
    if (this.filterForm.value.dueDateFrom) {
      filteredItems = filteredItems.filter(task => moment(task.dueDate, 'DD.MM.yyyy HH:mm').isAfter(this.filterForm.value.dueDateFrom!));
    }
    if (this.filterForm.value.dueDateTo) {
      filteredItems = filteredItems.filter(task => moment(task.dueDate, 'DD.MM.yyyy HH:mm').isBefore(this.filterForm.value.dueDateTo!));
    }
    this.itemsSubject.next(filteredItems);
  }

  clearForm() {
    this.filterForm.reset();
    this.itemsSubject.next([...this.allItems]);

  }

  viewTask(task: Task) {
    console.log(task)
    this.dialogService.open(ItemCardComponent, {
      context: {
        readOnly: true,
        task: task
      }
    });
  }

  moveItemUp(i: number) {
    if (i > 0) {
      let a = this.allItems[i];
      this.allItems[i] = this.allItems[i - 1];
      this.allItems[i - 1] = a;
      this.filterBy()
    }
  }

  moveItemDown(i: number) {
    if (i < this.allItems.length - 1) {
      let a = this.allItems[i];
      this.allItems[i] = this.allItems[i + 1];
      this.allItems[i + 1] = a;
      this.filterBy()
    }
  }

}
