import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CreateMinterPostDto } from '../../../../../../../Instamint/instamint/instamint-back/src/shared/dto/create-minter-post.dto';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.scss'],
})
export class SignComponent implements OnInit {
  form: any = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.form.password !== this.form.confirmPassword) {
      console.error('Passwords do not match!');
      return;
    }

    const minterData: CreateMinterPostDto = {
      username: this.form.username,
      email: this.form.email,
      password: this.form.password,
      phone: '',
      location: '',
      profilBio: '',
      profilPicture: '',
      roles: 'user',
      profilPrivate: '',
      profilLink: '',
      followers: 0,
      followered: 0,
      idTeaBag: 0,
      idNft: 0,
      idReport: 0
    };

    this.authService.createMinter(minterData).subscribe(
      (response) => {
        console.log('Minter created successfully:', response);
        this.router.navigate(['/auth/login']);
      },
      (error) => {
        console.error('Error creating minter:', error);
      }
    );
  }
}
