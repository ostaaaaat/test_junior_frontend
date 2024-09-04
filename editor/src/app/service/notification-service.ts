import { Injectable } from "@angular/core";
import { NbToastrService } from "@nebular/theme";
import { StorageService } from "./storage-service";
import * as moment from "moment";
import { TranslateService } from '@ngx-translate/core';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {

    constructor(private toastrService: NbToastrService, private translate: TranslateService, private storageService: StorageService) { }

    firedTasks: string[] = [];

    init() {
        setInterval(() => {
            this.storageService.getTasks()
                .filter(task => !this.firedTasks.includes(task.id))
                .filter(task => moment(task.dueDate, 'DD.MM.yyyy HH:mm').isBefore(moment()))
                .forEach(task => {
                    this.translate.get(['notification', 'dueDate', 'description']).subscribe(translations => {
                        const notificationMessage = `${translations['notification']} ${task.name}
                        \n${translations['dueDate']} ${task.dueDate}
                        \n${translations['description']} ${task.description}`;
                        this.toastrService.info(notificationMessage);
                    });
                    this.firedTasks.push(task.id);
                })
        }, 1000);
    }

}
