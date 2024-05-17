import { Test, TestingModule } from '@nestjs/testing';
import { UsersProfileController } from './users-profile.controller';

describe('UsersProfileController', () => {
  let controller: UsersProfileController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersProfileController],
    }).compile();

    controller = module.get<UsersProfileController>(UsersProfileController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
