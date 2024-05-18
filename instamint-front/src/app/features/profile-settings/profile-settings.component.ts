import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

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

  constructor(
    public dialogRef: MatDialogRef<SettingsComponent>,
    private fb: FormBuilder,
    private http: HttpClient
  ) {
    this.settingsForm = this.fb.group({
      username: ['', Validators.required],
      email: [''],
      password: [''],
      confirmPassword: [''],
      pageLink: [''],
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

  submitForm(): void {
    if (this.settingsForm.valid) {
      this.http.put('http://localhost:3000/modules/update-user-data', this.settingsForm.value).subscribe(response => {
        console.log(response);
        this.dialogRef.close();
      });
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}