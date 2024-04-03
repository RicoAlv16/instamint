import { Test, TestingModule } from '@nestjs/testing';
import { SearchMinterController } from './search-minter.controller';

describe('SearchMinterController', () => {
  let controller: SearchMinterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SearchMinterController],
    }).compile();

    controller = module.get<SearchMinterController>(SearchMinterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
