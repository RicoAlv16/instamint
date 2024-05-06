import { TestBed } from '@angular/core/testing';

import { MintersProfileService } from './minters-profile.service';

describe('MintersProfileService', () => {
  let service: MintersProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MintersProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
