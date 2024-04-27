import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'src/app/shared/services/notifications.service';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { NotificationsInterface } from 'src/app/shared/interfaces/notifications.interface';

@Component({
    selector: 'app-notifications',
    templateUrl: './notifications.component.html',
    styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit{

    idMinter = 1
    allNotifications$!: Observable<NotificationsInterface[]>
    refreshAllNotifications$ = new BehaviorSubject<boolean>(true)

    constructor(private _minterNotifications: NotificationsService) {}

    ngOnInit(): void {

        this.allNotifications$ = this.refreshAllNotifications$.pipe(
            switchMap(_ => this._minterNotifications.getNotificationsByMinter(this.idMinter))
        )
        this.allNotifications$.subscribe( data => {
            console.log("les notif====", data)
        })

    }

}
