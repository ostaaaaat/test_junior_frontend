import { Injectable } from "@angular/core";
import { NbToastrService } from "@nebular/theme";
import { Task } from "../model/task";
import { StorageService } from "./storage-service";
import * as moment from "moment";

@Injectable({
    providedIn: 'root'
})
export class NotificationService {

    constructor(private toastrService: NbToastrService, private storageService: StorageService) { }

    firedTasks: Task[] = [];

    init() {
        setInterval(() => {
            this.storageService.getTasks()
                .filter(task => !this.firedTasks.includes(task))
                .filter(task => moment(task.dueDate, 'DD.MM.yyyy HH:mm').isBefore(moment()))
                .forEach(task => {
                    console.log(task)
                    console.log(this.firedTasks)
                    this.toastrService.danger('Вышло время для задачи ' + task.name);
                    this.firedTasks.push(task);
                })
        }, 1000);
    }

}
