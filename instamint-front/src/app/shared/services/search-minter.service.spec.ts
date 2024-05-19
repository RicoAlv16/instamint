import { TestBed } from '@angular/core/testing';

import { SearchMinterService } from './search-minter.service';

describe('SearchMinterService', () => {
  let service: SearchMinterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchMinterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
