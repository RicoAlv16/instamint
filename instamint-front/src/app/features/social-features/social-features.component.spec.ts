import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialFeaturesComponent } from './social-features.component';

describe('SocialFeaturesComponent', () => {
  let component: SocialFeaturesComponent;
  let fixture: ComponentFixture<SocialFeaturesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SocialFeaturesComponent]
    });
    fixture = TestBed.createComponent(SocialFeaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
