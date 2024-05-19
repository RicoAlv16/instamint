import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SettingsComponent } from './profile-settings.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

describe('SettingsComponent', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      providers: [
        { provide: MatDialogRef, useValue: {} } // Fournir un faux MatDialogRef
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create the SettingsComponent', () => {
    expect(component).toBeTruthy();
  });
  it('should invalidate the form if username contains special characters', () => {
    const username = component.settingsForm.controls['username'];
    username.setValue('user@name');
    expect(username.valid).toBeFalsy();
  });

  it('should validate the form if username does not contain special characters', () => {
    const username = component.settingsForm.controls['username'];
    username.setValue('username');
    expect(username.valid).toBeTruthy();
  });

  it('should invalidate the form if email is invalid', () => {
    const email = component.settingsForm.controls['email'];
    email.setValue('user/examplecom');
    expect(email.valid).toBeFalsy();
  });

  it('should validate the form if email is valid', () => {
    const email = component.settingsForm.controls['email'];
    email.setValue('user@example.com');
    expect(email.valid).toBeTruthy();
  });

  it('should invalidate the form if passwords do not match', () => {
    const password = component.settingsForm.controls['password'];
    const confirmPassword = component.settingsForm.controls['confirmPassword'];
    password.setValue('password123');
    confirmPassword.setValue('password456');
    expect(component.settingsForm.valid).toBeFalsy();
  });

  it('should invalidate the password if it does not meet complexity requirements', () => {
    const passwordControl = component.settingsForm.get('password');

    if (passwordControl) {
        passwordControl.setValue('weakpassword');
        expect(passwordControl.errors?.['passwordStrength']).toBeTruthy();

        passwordControl.setValue('weakpassword!');
        expect(passwordControl.errors?.['passwordStrength']).toBeTruthy();

        passwordControl.setValue('WEAKPASSWORD!');
        expect(passwordControl.errors?.['passwordStrength']).toBeTruthy();

        passwordControl.setValue('WeakPassword!');
        expect(passwordControl.errors?.['passwordStrength']).toBeTruthy();

        passwordControl.setValue('StrongPassword123!');
        expect(passwordControl.errors).toBeNull();
    } else {
        fail('Password control is null');
    }
  });

  it('should send form data when form is valid', () => {
    spyOn(component, 'submitForm').and.callThrough();
    component.settingsForm.setValue({
      username: 'testuser',
      email: 'test@example.com',
      password: 'Test123?',
      confirmPassword: 'Test123?',
      pageLink: 'instamint.fr/testuser',
      bio: 'This is a test bio.',
      profileImage: null
    });
    component.submitForm();
    expect(component.submitForm).toHaveBeenCalled();
  });
});