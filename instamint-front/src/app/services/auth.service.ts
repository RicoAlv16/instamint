import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICredentials } from '../interfaces/credentials';
import { IToken } from '../interfaces/token';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url = 'http://localthost:8080/auth/login';

  constructor(private http: HttpClient) {}

  login(credentials: ICredentials): Observable<IToken> {
    return this.http.post<IToken>(this.url, credentials);
  }
}
