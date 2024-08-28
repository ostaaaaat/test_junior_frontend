import { Component } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { StorageService } from '../service/storage-service';
import { Task } from '../model/task'
import { FormControl, FormGroup } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.css']
})
export class AddDialogComponent {

  constructor(private storageService: StorageService, protected dialogRef: NbDialogRef<AddDialogComponent>) {}

  taskForm = new FormGroup( {
    dueDate: new FormControl(moment()),
    name: new FormControl(''),
    description: new FormControl('')
  });

  save() {
    let task: Task = {
      name: this.taskForm.value.name!,
      createDate: moment().format('DD.MM.yyyy HH:mm'),
      dueDate: moment(this.taskForm.value.dueDate).format('DD.MM.yyyy HH:mm'),
      description: this.taskForm.value.description!
    }
    let tasks = this.storageService.getTasks();
    tasks.push(task);
    this.storageService.updateTasks(tasks);
    this.dialogRef.close();
    console.log('task:', this.taskForm.value.dueDate);
  }

  close() {
    this.dialogRef.close();
  }
}
