import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OpenPostComponent } from './open-post.component';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';

describe('OpenPostComponent', () => {
  let component: OpenPostComponent;
  let fixture: ComponentFixture<OpenPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OpenPostComponent],
      imports: [MatDialogModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: { imageUrl: 'test-image-url' } }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the OpenPostComponent', () => {
    expect(component).toBeTruthy();
  });
});
