import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NotificationsService } from 'src/app/shared/services/notifications.service';
import { NotificationsInterface } from 'src/app/shared/interfaces/notifications.interface';

@Component({
    selector: 'app-notifications',
    templateUrl: './notifications.component.html',
    styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit{

    idMinter = 1
    allNotifications: NotificationsInterface[] = [];
    allNotificationsAndFiltered: NotificationsInterface[] = []
    @Output() notifNumberChanged = new EventEmitter<number>();

    constructor(private notificationsService: NotificationsService) {}

    ngOnInit(): void {

        this.notificationsService.getNotificationsByMinter(this.idMinter).subscribe( data => {
            this.allNotifications = data
            this.allNotificationsAndFiltered = data
        })

    }
    notificationType = "Select the type"
    disableNotifications (event: string) {
        this.allNotificationsAndFiltered = this.allNotifications.
            filter((notif:NotificationsInterface) =>
                notif.type.toLowerCase().includes(event.toLowerCase())
            )
    }

    ignoreNftCommentNotifications(index: number) {
        if (index !== -1) {
            this.allNotificationsAndFiltered.splice(index, 1)
            this.notifNumberChanged.emit(this.allNotificationsAndFiltered.length)
        }
    }

}
