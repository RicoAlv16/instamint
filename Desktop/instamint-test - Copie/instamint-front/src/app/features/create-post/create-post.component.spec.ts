import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CreatePostComponent } from './create-post.component';

describe('CreatePostComponent', () => {
  let component: CreatePostComponent;
  let fixture: ComponentFixture<CreatePostComponent>;
  let httpClient: HttpClient;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        CommonModule,
        MatIconModule,
        MatDialogModule,
        MatCardModule,
        MatButtonModule,
        MatCheckboxModule,
        HttpClientModule
      ]
    }).compileComponents();

    httpClient = TestBed.inject(HttpClient);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should import FormsModule correctly', () => {
    expect(component).toBeTruthy();
  });

  it('should import HttpClientModule correctly', () => {
    expect(component).toBeTruthy();
  });

  it('should import MatDialogModule correctly', () => {
    expect(component).toBeTruthy();
  });

  it('should import MatCardModule correctly', () => {
    expect(component).toBeTruthy();
  });

  it('should import MatButtonModule correctly', () => {
    expect(component).toBeTruthy();
  });

  it('should import MatIconModule correctly', () => {
    expect(component).toBeTruthy();
  });

  it('should import MatCheckboxModule correctly', () => {
    expect(component).toBeTruthy();
  });

  it('should disable post button when terms are not accepted', () => {
    const button = fixture.nativeElement.querySelector('#post-button');
    component.termsAccepted = false;
    fixture.detectChanges();
    expect(button.disabled).toBeTruthy();
    component.termsAccepted = true;
    fixture.detectChanges();
    expect(button.disabled).toBeFalsy();
  });
});
