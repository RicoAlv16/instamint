import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersProfileService } from './users-profile.service';
import { MinterEntity } from 'src/shared/entities/minter.entity';
import { TeaBagEntity } from 'src/shared/entities/tea-bag.entity';
import { HttpException } from '@nestjs/common';

describe('UsersProfileService', () => {
  let service: UsersProfileService;
  let minterRepository: Repository<MinterEntity>;
  let teaBagRepository: Repository<TeaBagEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersProfileService,
        {
          provide: getRepositoryToken(MinterEntity),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(TeaBagEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<UsersProfileService>(UsersProfileService);
    minterRepository = module.get<Repository<MinterEntity>>(getRepositoryToken(MinterEntity));
    teaBagRepository = module.get<Repository<TeaBagEntity>>(getRepositoryToken(TeaBagEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllMinters', () => {
    it('should return all minters', async () => {
      const minters: MinterEntity[] = [
        {
          id: 1,
          email: 'minter1@example.com',
          username: 'minter1',
          phone: '123456789',
          location: 'Paris, France',
          password: '',
          profilBio: '',
          profilPicture: '',
          role: '',
          permission: '',
          profilPrivate: '',
          profilLink: '',
          followers: 0,
          followered: 0,
          idTeaBag: 0,
          idNft: 0,
          idReport: 0,
          notifications: [],
          teabag: [],
          nfts: []
        },
        {
          id: 2,
          email: 'minter2@example.com',
          username: 'minter2',
          phone: '987654321',
          location: 'London, UK',
          password: '',
          profilBio: '',
          profilPicture: '',
          role: '',
          permission: '',
          profilPrivate: '',
          profilLink: '',
          followers: 0,
          followered: 0,
          idTeaBag: 0,
          idNft: 0,
          idReport: 0,
          notifications: [],
          teabag: [],
          nfts: []
        },
      ];

      jest.spyOn(minterRepository, 'find').mockResolvedValue(minters);

      expect(await service.getAllMinters()).toEqual(minters);
    });

    it('should throw an error if find fails', async () => {
      jest.spyOn(minterRepository, 'find').mockRejectedValue(new Error('Failed to find minters'));

      await expect(service.getAllMinters()).rejects.toThrow(HttpException);
    });
  });

  describe('getAllTeaBags', () => {
    it('should return all tea bags', async () => {
      const teaBags: TeaBagEntity[] = [
        {
          id: 1,
          username: 'teabag1',
          bio: 'This is the bio of teabag1',
          location: 'Paris, France',
          link: '',
          followers: 0,
          followered: 0,
          cookNumber: 0,
          whiteListe: '',
          whiteListeDate: undefined,
          idNft: 0,
          minter: new MinterEntity,
          nfts: []
        },
        {
          id: 2,
          username: 'teabag2',
          bio: 'This is the bio of teabag2',
          location: 'London, UK',
          link: '',
          followers: 0,
          followered: 0,
          cookNumber: 0,
          whiteListe: '',
          whiteListeDate: undefined,
          idNft: 0,
          minter: new MinterEntity,
          nfts: []
        },
      ];

      jest.spyOn(teaBagRepository, 'find').mockResolvedValue(teaBags);

      expect(await service.getAllTeaBags()).toEqual(teaBags);
    });

    it('should throw an error if find fails', async () => {
      jest.spyOn(teaBagRepository, 'find').mockRejectedValue(new Error('Failed to find tea bags'));

      await expect(service.getAllTeaBags()).rejects.toThrow(HttpException);
    });
  });

  describe('getTeaBagByMinter', () => {
    it('should return tea bags by minter', async () => {
      const idMinter = 1;
      const teaBags: TeaBagEntity[] = [
        {
          id: 1,
          username: 'teabag1',
          bio: 'This is the bio of teabag1',
          location: 'Paris, France',
          link: '',
          followers: 0,
          followered: 0,
          cookNumber: 0,
          whiteListe: '',
          whiteListeDate: undefined,
          idNft: 0,
          minter: new MinterEntity,
          nfts: []
        },
        {
          id: 2,
          username: 'teabag2',
          bio: 'This is the bio of teabag2',
          location: 'London, UK',
          link: '',
          followers: 0,
          followered: 0,
          cookNumber: 0,
          whiteListe: '',
          whiteListeDate: undefined,
          idNft: 0,
          minter: new MinterEntity,
          nfts: []
        },
      ];

      jest.spyOn(teaBagRepository, 'createQueryBuilder').mockImplementation(() => ({
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        groupBy: jest.fn().mockReturnThis(),
        getRawMany: jest.fn().mockResolvedValue(teaBags),
      }) as any);

      expect(await service.getTeaBagByMinter(idMinter)).toEqual(teaBags);
    });

    it('should throw an error if there is an issue', async () => {
      const idMinter = 1;

      jest.spyOn(teaBagRepository, 'createQueryBuilder').mockImplementation(() => ({
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        groupBy: jest.fn().mockReturnThis(),
        getRawMany: jest.fn().mockRejectedValue(new Error('Error fetching tea bags')),
      }) as any);

      await expect(service.getTeaBagByMinter(idMinter)).rejects.toThrow(HttpException);
    });
  });
});
