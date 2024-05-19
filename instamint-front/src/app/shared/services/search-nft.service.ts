import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NftsInterface } from '../interfaces/nfts.interface';
import { Observable } from 'rxjs';
import { env } from '../env';

@Injectable({
    providedIn: 'root',
})
export class SearchNftService {
    private _env = new env();

    constructor(private _http: HttpClient) {}

    getAllNfts(): Observable<NftsInterface[]> {
        return this._http.get<NftsInterface[]>(this._env.serveur + '/search-nft');
    }
}
