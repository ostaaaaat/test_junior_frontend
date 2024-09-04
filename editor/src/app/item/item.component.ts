import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../model/task';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent {
  @Input() item!: Task;
  @Output() copy = new EventEmitter<Task>();
  @Output() delete = new EventEmitter<string>();

  copyItem() {
    this.copy.emit(this.item);
  }

  deleteItem() {
    this.delete.emit(this.item.id);
  }
}
