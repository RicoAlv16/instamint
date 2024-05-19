import { Injectable } from '@angular/core';
import { env } from '../env';
import { HttpClient } from '@angular/common/http';
import { MinterInterface } from '../interfaces/minter.interface';
import { TeaBagInterface } from '../interfaces/tea-bag.interface';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SearchMinterService {
    private _env = new env();

    constructor(private _http: HttpClient) {}

    getAllMinterAndTeaBag(): Observable<
    Array<MinterInterface | TeaBagInterface>
    > {
        return this._http.get<Array<MinterInterface | TeaBagInterface>>(
            this._env.serveur + '/search-minter'
        );
    }
}
