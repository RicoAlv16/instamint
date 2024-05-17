import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MintersProfileWithNftsListComponent } from './minters-profile-with-nfts-list.component';

describe('MintersProfileWithNftsListComponent', () => {
  let component: MintersProfileWithNftsListComponent;
  let fixture: ComponentFixture<MintersProfileWithNftsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MintersProfileWithNftsListComponent]
    });
    fixture = TestBed.createComponent(MintersProfileWithNftsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
