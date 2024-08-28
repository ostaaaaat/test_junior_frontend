import { Component } from '@angular/core';
import { StorageService } from '../service/storage-service';
import { Task } from '../model/task';
import { NbMenuItem } from '@nebular/theme';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent {
  items: Task[] = [];

  menuItems: NbMenuItem[] = [
    { title: 'Вверх', data: 'up' },
    { title: 'Вниз', data: 'down' },
  ];

  nameFilter: string = '';
  dateFrom: Date | null = null;
  dateTo: Date | null = null;

  onMenuItemClick(event: any, item: any) {
    const action = event.item.data;
    if (action === 'up') {
      this.moveItemUp(item);
    } else if (action === 'down') {
      this.moveItemDown(item);
    }
  }

  moveItemUp(item: any) {
    
  }

  moveItemDown(item: any) {
    
  }

  constructor(private storageService: StorageService) {
    this.items = storageService.getTasks();
   }


}
