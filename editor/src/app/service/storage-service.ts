import { Injectable } from '@angular/core';
import { Task } from '../model/task';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  tasks: Task[] = [{
    name: 'Элемент 1',
    createDate: '22-12-2022 00:10',
    dueDate: '22-12-2022 00:10',
    description: 'Описание элемента 1'
  },
  {
    name: 'Элемент 12',
    createDate: new Date('2024-01-01').toDateString(),
    dueDate: new Date('2024-02-01').toDateString(),
    description: 'Описание элемента 1'
  },
  {
    name: 'Элемент 13',
    createDate: new Date('2024-01-01').toDateString(),
    dueDate: new Date('2024-02-01').toDateString(),
    description: 'Описание элемента 1'
  },
  {
    name: 'Элемент 14',
    createDate: new Date('2024-01-01').toDateString(),
    dueDate: new Date('2024-02-01').toDateString(),
    description: 'Описание элемента 1'
  },];

  public getTasks(): Task[] {
    return this.tasks;
  }

  public updateTasks(tasks: Task[]) {
    this.tasks = tasks;
  }
}
