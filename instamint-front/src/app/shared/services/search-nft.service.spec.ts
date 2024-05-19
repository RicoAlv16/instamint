import { TestBed } from '@angular/core/testing';

import { SearchNftService } from './search-nft.service';

describe('SearchNftService', () => {
  let service: SearchNftService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchNftService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
