import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ICredentials } from 'src/app/interfaces/credentials';
import { IToken } from 'src/app/interfaces/token';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: ICredentials = {
    email: '',
    password: '',
  };
  constructor(private authServices: AuthService) {}

  ngOnInit(): void {}
  onSubmit(): void {
    console.log(this.form);
    this.authServices.login(this.form).subscribe(
      data => console.log(data.access_token),
      err => console.log(err)
    );
  }
}
