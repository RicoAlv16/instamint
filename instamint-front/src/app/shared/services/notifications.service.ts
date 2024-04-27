import { Injectable } from '@angular/core';
import { env } from '../env';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NotificationsInterface } from '../interfaces/notifications.interface';

@Injectable({
    providedIn: 'root'
})
export class NotificationsService {
    private _env = new env();
    httpOptions = { headers: new HttpHeaders({'Content-Type': 'application/json'}) }

    constructor( private _http: HttpClient ) { }

    getNotificationsByMinter(idMinter: number): Observable<NotificationsInterface[]> {
        return this._http.get<NotificationsInterface[]>(this._env.serveur + '/notifications/minter-notifications/'+ idMinter, this.httpOptions);
    }
}
