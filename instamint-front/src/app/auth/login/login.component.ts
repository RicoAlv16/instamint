import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.authService.login(this.email, this.password).subscribe({
      next: (data: { access_token: string; roles: string[] }) => {
        console.log('Login successful:', data);
        const roles = data.roles || [];
        if (roles.includes('admin')) {
          this.router.navigate(['/admin-dashboard']);
        } else {
          this.router.navigate(['/public/home']); 
        }
      },
      error: (error: any) => {
        console.error('Login failed:', error.error.message || 'Unknown error');
      }
    });
  }
}
