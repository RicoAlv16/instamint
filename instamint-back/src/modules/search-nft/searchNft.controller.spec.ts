import { Test, TestingModule } from '@nestjs/testing';
import { SearchNftController } from './search-nft.controller';

describe('SearchNftController', () => {
  let controller: SearchNftController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SearchNftController],
    }).compile();

    controller = module.get<SearchNftController>(SearchNftController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
