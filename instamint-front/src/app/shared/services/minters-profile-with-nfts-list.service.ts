import { Injectable } from '@angular/core';
import { NftsInterface } from '../interfaces/nfts.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { env } from '../env';

@Injectable({
    providedIn: 'root'
})
export class MintersProfileWithNftsListService {

    private _env = new env();
    httpOptions = { headers: new HttpHeaders({'Content-Type': 'application/json'}) }

    constructor(private _http: HttpClient) {}

    getNftsByMinter(idMinter: number): Observable<NftsInterface[]> {
        return this._http.get<NftsInterface[]>(this._env.serveur + '/minters-profile-with-nfts-list/minter-nfts-list/'+ idMinter, this.httpOptions);
    }
    getNftsByTeaBag(idTeaBag: number): Observable<NftsInterface[]> {
        return this._http.get<NftsInterface[]>(this._env.serveur + '/minters-profile-with-nfts-list/teabag-nfts-list/'+ idTeaBag, this.httpOptions);
    }
}
