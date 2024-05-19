import { Test, TestingModule } from '@nestjs/testing';
import { UpdateUserDataService } from '../update-minter-data/update-minter-data.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Minter } from '../../shared/entities/minter.entity';
import { Repository } from 'typeorm';
import { UpdateMinterDto } from '../../shared/dto/update-minter-data.dto';

describe('UpdateUserDataService', () => {
  let service: UpdateUserDataService;
  let repository: Repository<Minter>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateUserDataService,
        {
          provide: getRepositoryToken(Minter),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<UpdateUserDataService>(UpdateUserDataService);
    repository = module.get<Repository<Minter>>(getRepositoryToken(Minter));
  });

  it('should update user successfully', async () => {
    const updateMinterDto: UpdateMinterDto = { minterId: 1 };

    const minter: Minter = {
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
  
    const expectedResult: Partial<Minter> = { 
      ...minter,
    };
  
    jest.spyOn(repository, 'findOne').mockResolvedValue(minter);

    jest.spyOn(repository, 'save').mockResolvedValue(expectedResult as Minter);

    const result = await service.updateUser(updateMinterDto);

    expect(repository.save).toHaveBeenCalledWith(expectedResult);

    expect(result).toEqual(expectedResult);
  });
});
