import { Test, TestingModule } from '@nestjs/testing';
import { SearchMinterService } from './search-minter.service';

describe('SearchMinterService', () => {
  let service: SearchMinterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SearchMinterService],
    }).compile();

    service = module.get<SearchMinterService>(SearchMinterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
