import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { AuthRoutingModule } from './auth-routing.module';
import { SignComponent } from './sign/sign.component';

@NgModule({
  declarations: [LoginComponent, LogoutComponent, SignComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule
  ],
  exports: [LoginComponent, LogoutComponent, SignComponent]
})
export class AuthModule {}
