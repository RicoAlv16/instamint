import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private adminUrl = 'http://localhost:3000/admin';

  constructor(private http: HttpClient) {}

  private getAuthHeaders() {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  disableMinter(id: number) {
    return this.http.patch(
      `${this.adminUrl}/disable-minter/${id}`,
      {},
      { headers: this.getAuthHeaders() }
    );
  }
}
