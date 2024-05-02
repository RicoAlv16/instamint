import { NotificationsService } from '../shared/services/notifications.service';
import { NotificationsComponent } from './../features/notifications/notifications.component';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

    notifNumber = 0;
    idMinter = 1;

    constructor(private _minterNotifications: NotificationsService) {}

    @ViewChild('notificationsComponent', { static: false })
        notificationsComponent!: NotificationsComponent;

    ngOnInit(): void {
        this._minterNotifications.getNotificationsByMinter(this.idMinter).subscribe( data => {
            this.notifNumber = data.length
        })
    }
    updateNotifNumber(event:number){
        this.notifNumber = event
    }
}
