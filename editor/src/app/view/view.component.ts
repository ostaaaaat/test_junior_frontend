import { Component, OnInit } from '@angular/core';
import { StorageService } from '../service/storage-service';
import { Task } from '../model/task';
import { NbDialogService, NbGlobalPosition, NbMenuItem, NbMenuService } from '@nebular/theme';
import { ItemCardComponent } from '../item-card/item-card.component';
import { FormControl, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { TranslateService } from '@ngx-translate/core';
import { NbToastrService } from '@nebular/theme';
import { map } from 'rxjs/operators';
import { NotificationService } from '../service/notification-service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  items: Task[] = [];
  allItems: Task[] = [];

  menuItems: NbMenuItem[] = [
    { title: 'Вверх', data: 'up' },
    { title: 'Вниз', data: 'down' },
  ];

  filterForm: FormGroup;
  filters = {
    name: null,
    dueDateFrom: null,
    dueDateTo: null
  }

  constructor(private storageService: StorageService, private dialogService: NbDialogService, private nbMenuService: NbMenuService,
    private toastrService: NbToastrService, private translate: TranslateService,
    private notificationService: NotificationService) {
    this.notificationService.init();
    this.allItems = storageService.getTasks();
    this.items = [...this.allItems];
    this.filterForm = new FormGroup({
      name: new FormControl(null),
      dueDateFrom: new FormControl<moment.Moment | null>(null),
      dueDateTo: new FormControl<moment.Moment | null>(null)
    });
    this.filterForm.get('name')?.valueChanges.subscribe(val => {
      this.filters.name = val;
      this.applyFilters();
    });
    this.filterForm.get('dueDateFrom')?.valueChanges.subscribe(val => {
      this.filters.dueDateFrom = val;
      this.applyFilters();
    });
    this.filterForm.get('dueDateTo')?.valueChanges.subscribe(val => {
      this.filters.dueDateTo = val;
      this.applyFilters();
    });
  }

  applyFilters() {
    this.items = [...this.allItems]
    if (this.filters.name) {
      this.items = this.items.filter(task => task.name.includes(this.filters.name!))
    }
    if (this.filters.dueDateFrom) {
      this.items = this.items.filter(task => moment(task.dueDate, 'DD.MM.yyyy HH:mm').isAfter(this.filters.dueDateFrom))
    }
    if (this.filters.dueDateTo) {
      this.items = this.items.filter(task => moment(task.dueDate, 'DD.MM.yyyy HH:mm').isBefore(this.filters.dueDateTo));
    }
  }

  clearForm() {
    this.filterForm.setValue({
      name: null,
      dueDateFrom: null,
      dueDateTo: null
    })
    this.filters = {
      name: null,
      dueDateFrom: null,
      dueDateTo: null
    }
    this.items = [...this.allItems];

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

  onMenuItemClick(action: string, i: number) {
    if (action === 'up') {
      this.moveItemUp(i);
    } else if (action === 'down') {
      this.moveItemDown(i);
    }
  }

  moveItemUp(i: number) {
    if (i > 0) {
      let a = this.allItems[i];
      this.allItems[i] = this.allItems[i - 1];
      this.allItems[i - 1] = a;
      this.applyFilters()
    }
  }

  moveItemDown(i: number) {
    if (i < this.allItems.length - 1) {
      let a = this.allItems[i];
      this.allItems[i] = this.allItems[i + 1];
      this.allItems[i + 1] = a;
      this.applyFilters()
    }
  }

  ngOnInit() {
    this.nbMenuService.onItemClick()
      .subscribe(event => this.onMenuItemClick(event.item.data, Number(event.tag)));
  }



}
