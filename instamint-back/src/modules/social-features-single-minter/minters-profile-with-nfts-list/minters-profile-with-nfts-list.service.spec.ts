import { Test, TestingModule } from '@nestjs/testing';
import { MintersProfileWithNftsListService } from './minters-profile-with-nfts-list.service';

describe('MintersProfileWithNftsListService', () => {
  let service: MintersProfileWithNftsListService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MintersProfileWithNftsListService],
    }).compile();

    service = module.get<MintersProfileWithNftsListService>(MintersProfileWithNftsListService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
