import { Test, TestingModule } from '@nestjs/testing';
import { SearchNftService } from './searchNft.service';

describe('SearchNftService', () => {
  let service: SearchNftService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SearchNftService],
    }).compile();

    service = module.get<SearchNftService>(SearchNftService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
