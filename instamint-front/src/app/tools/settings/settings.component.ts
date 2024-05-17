import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
})

export class SettingsComponent {
  settingsForm: FormGroup;
  profileImagePreview: string | ArrayBuffer | null;

  constructor(
    public dialogRef: MatDialogRef<SettingsComponent>,
    private fb: FormBuilder
  ) {
    this.settingsForm = this.fb.group({
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
      // Handle form submission
      console.log(this.settingsForm.value);
      this.dialogRef.close();
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
