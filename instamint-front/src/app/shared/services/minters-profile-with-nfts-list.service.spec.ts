import { TestBed } from '@angular/core/testing';

import { MintersProfileWithNftsListService } from './minters-profile-with-nfts-list.service';

describe('MintersProfileWithNftsListService', () => {
  let service: MintersProfileWithNftsListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MintersProfileWithNftsListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
