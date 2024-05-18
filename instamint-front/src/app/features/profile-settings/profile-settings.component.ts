import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
})
export class SettingsComponent {
  settingsForm: FormGroup;
  profileImagePreview: string | ArrayBuffer | null;
  errorMessage: string = '';

  constructor(
    public dialogRef: MatDialogRef<SettingsComponent>,
    private fb: FormBuilder,
    private http: HttpClient
  ) {
    this.settingsForm = this.fb.group({
      username: ['', [this.noSpecialCharactersValidator()]],
      email: ['', [Validators.email]],
      password: ['', this.passwordStrengthValidator()],
      confirmPassword: [''],
      pageLink: ['', this.profileLinkValidator()],
      bio: ['', Validators.maxLength(300)],
      profileImage: [null]
    }, { validators: this.passwordMatchValidator });
    
    this.profileImagePreview = null;
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.profileImagePreview = reader.result;
      };
      reader.readAsDataURL(file);
      this.settingsForm.patchValue({ profileImage: file });
    }
  }

  passwordMatchValidator(group: FormGroup) {
    const passwordControl = group.get('password');
    const confirmPasswordControl = group.get('confirmPassword');
  
    if (passwordControl && confirmPasswordControl) {
      const password = passwordControl.value;
      const confirmPassword = confirmPasswordControl.value;
  
      return password === confirmPassword ? null : { passwordMismatch: true };
    }
  
    return null;
  }

  passwordStrengthValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      if (!value) return null;

      const hasUpperCase = /[A-Z]/.test(value);
      const hasLowerCase = /[a-z]/.test(value);
      const hasNumeric = /[0-9]/.test(value);
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);

      const valid = hasUpperCase && hasLowerCase && hasNumeric && hasSpecialChar;

      return !valid ? { passwordStrength: true } : null;
    };
  }

  noSpecialCharactersValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      if (!value) return null;

      const hasSpecialCharacters = /[^a-zA-Z0-9]/.test(value);

      return hasSpecialCharacters ? { noSpecialCharacters: true } : null;
    };
  }

  profileLinkValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      if (!value) return null;

      const startsWithInstamint = /^instamint\.fr\/[a-z0-9]+$/.test(value);

      return !startsWithInstamint ? { invalidProfileLink: true } : null;
    };
  }

  submitForm(): void {
    if (this.settingsForm.valid) {
      this.http.put('http://localhost:3000/modules/update-user-data', this.settingsForm.value)
        .pipe(
          catchError((error: HttpErrorResponse) => {
            if (error.status === 409) {
              this.errorMessage = error.error.message;
            } else {
              this.errorMessage = 'An unexpected error occurred.';
            }
            return throwError(error);
          })
        )
        .subscribe(response => {
          console.log(response);
          this.dialogRef.close();
        });
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}