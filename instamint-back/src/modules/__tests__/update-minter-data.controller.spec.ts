import { Test, TestingModule } from '@nestjs/testing';
import { UpdateUserDataController } from '../update-minter-data/update-minter-data.controller';
import { UpdateUserDataService } from '../update-minter-data/update-minter-data.service';
import { UpdateMinterDto } from '../../shared/dto/update-minter-data.dto';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Minter } from '../../shared/entities/minter.entity';

describe('UpdateUserDataController', () => {
  let controller: UpdateUserDataController;
  let service: UpdateUserDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UpdateUserDataController],
      providers: [
        UpdateUserDataService,
        {
          provide: getRepositoryToken(Minter),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<UpdateUserDataController>(UpdateUserDataController);
    service = module.get<UpdateUserDataService>(UpdateUserDataService);
  });

  describe('updateUser', () => {
    it('should update user data', async () => {
      const updateData: UpdateMinterDto = {
        minterId: 1,
        username: 'testuser',
        email: 'test@example.com',
        password: 'testpassword',
      };

      const expectedResult: Minter = { 
        id_minter: 1,
        username: 'testuser', 
        email: 'test@example.com',
        password: 'testpassword',
        tel: '1234567890',
        profile_bio: 'testbio',
        profile_picture: Buffer.from(''),
        profile_link: 'testlink',
        role: 'user',
        profile_private: false,
        follower: 0,
        followed: 0,
      };

      jest.spyOn(service, 'updateUser').mockResolvedValueOnce(expectedResult);

      const result = await controller.updateUser(updateData);

      expect(result).toEqual(expectedResult);
    });
  });
});
