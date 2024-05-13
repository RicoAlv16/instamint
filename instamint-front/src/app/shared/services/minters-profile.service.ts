import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { env } from '../env';
import { MinterInterface } from '../interfaces/minter.interface';
import { TeaBagInterface } from '../interfaces/tea-bag.interface';

@Injectable({
    providedIn: 'root'
})
export class MintersProfileService {
  
    private _env = new env();
    httpOptions = { headers: new HttpHeaders({'Content-Type': 'application/json'}) }


    constructor(private _http: HttpClient) {}

    getAllMinters(): Observable<MinterInterface[]> {
        return this._http.get<MinterInterface[]>(
            this._env.serveur + '/users-profile/all-minters'
        )
    }

    getAllTeaBags(): Observable<TeaBagInterface[]> {
        return this._http.get<TeaBagInterface[]>(
            this._env.serveur + '/users-profile/all-teabags'
        )
    }

    getTeaBagByMinter(idMinter: number): Observable<TeaBagInterface[]> {
        return this._http.get<TeaBagInterface[]>(this._env.serveur + '/users-profile/user/'+ idMinter, this.httpOptions);
    }
}
