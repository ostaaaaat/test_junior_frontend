import { Component, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { StorageService } from '../service/storage-service';
import { Task } from '../model/task'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.css']
})
export class ItemCardComponent {
  
  private _readOnly: boolean;
  @Input()
  set readOnly(readOnly: boolean) {
    this._readOnly = readOnly;
    if (this._readOnly) {
      this.taskForm.disable();
    } else {
      this.taskForm.enable();
    }
  }
  get readOnly(): boolean {
    return this._readOnly
  }


  private _task!: Task;
  @Input()
  set task(task: Task) {
    this._task = task;
    if (task) {
      this.taskForm.setValue({
        dueDate: moment(this.task.dueDate, 'DD.MM.yyyy HH:mm'),
        name: task.name,
        description: task.description
      })
    }
  }
  get task(): Task {
    return this._task;
  }

  constructor(private storageService: StorageService, protected dialogRef: NbDialogRef<ItemCardComponent>) {
    this._readOnly = false;

    this.taskForm = new FormGroup({
      dueDate: new FormControl<moment.Moment>(moment(), [
        Validators.required,
        this.minDateValidator.bind(this)
      ]),
      name: new FormControl('',  [
        Validators.required,
      ]),
      description: new FormControl('', [
        Validators.required,
      ])
    });
  }

  taskForm: FormGroup

  minDateValidator(control: FormControl): { [key: string]: boolean } | null {
    const selectedDateTime = control.value;
    const now = moment();
  
    if (selectedDateTime && moment(selectedDateTime).isBefore(now)) {
      return { 'minDateTime': true };
    }
  
    return null;
  }

  save() {
    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      return;
    }
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
    this.readOnly = false;
  }

  close() {
    this.dialogRef.close();
    console.log(this.readOnly);
  }
}
