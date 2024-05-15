import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:3000/auth';
  private userSubject = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string) {
    return this.http.post<{ access_token: string; roles: string[] }>(
      `${this.baseUrl}/login`,
      { email, password }
    ).pipe(
      tap((resData: { access_token: string; roles: string[] }) => {
        console.log('Login response data:', resData);
        this.handleAuthentication(resData.access_token, resData.roles);
      })
    );
  }

  createMinter(minterData: any) {
    return this.http.post(`${this.baseUrl}/sign`, minterData);
  }

  private handleAuthentication(token: string, roles: string[] = []) {
    console.log('Handling authentication with roles:', roles);

    localStorage.setItem('token', token);
    localStorage.setItem('roles', JSON.stringify(roles));
    this.userSubject.next({ token, roles });

    if (roles.includes('admin')) {
      this.router.navigate(['/admin-dashboard']);
    } else {
      this.router.navigate(['/public/home']);
    }
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('roles');
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }

  autoLogin() {
    const token = localStorage.getItem('token');
    const roles = JSON.parse(localStorage.getItem('roles') || '[]');
    console.log('Auto-login roles:', roles);

    if (!token) {
      return;
    }
    this.userSubject.next({ token, roles });

    if (roles.includes('admin')) {
      this.router.navigate(['/admin-dashboard']);
    } else {
      this.router.navigate(['/public/home']);
    }
  }
}
