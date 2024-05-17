import { Test, TestingModule } from '@nestjs/testing';
import { MintersProfileWithNftsListController } from './minters-profile-with-nfts-list.controller';

describe('MintersProfileWithNftsListController', () => {
  let controller: MintersProfileWithNftsListController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MintersProfileWithNftsListController],
    }).compile();

    controller = module.get<MintersProfileWithNftsListController>(MintersProfileWithNftsListController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
