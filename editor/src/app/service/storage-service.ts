import { Injectable } from '@angular/core';
import { Task } from '../model/task';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  tasks: Task[] = [{
    name: 'Элемент 1',
    createDate: '22-08-2024 20:10',
    dueDate: '22-08-2024 20:20',
    description: 'Описание элемента 1'
  },
  {
    name: 'Элемент 12',
    createDate: '22-08-2024 10:10',
    dueDate: '22-08-2024 10:20',
    description: 'Описание элемента 12'
  },
  {
    name: 'Элемент 13',
    createDate: '22-08-2024 14:10',
    dueDate: '22-08-2024 15:10',
    description: 'Описание элемента 13'
  },
  {
    name: 'Элемент 14',
    createDate: '22-08-2024 12:10',
    dueDate: '22-08-2024 13:10',
    description: 'Описание элемента 14'
  },];

  public getTasks(): Task[] {
    return this.tasks;
  }

  public updateTasks(tasks: Task[]) {
    this.tasks = tasks;
  }
}
