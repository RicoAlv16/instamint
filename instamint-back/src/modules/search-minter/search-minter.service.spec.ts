import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SearchMinterService } from './search-minter.service';
import { MinterEntity } from 'src/shared/entities/minter.entity';
import { TeaBagEntity } from 'src/shared/entities/tea-bag.entity';
import { CreateMinterPostDto } from 'src/shared/dto/creat-minter-post.dto';
import { CreateTeaBagPostDto } from 'src/shared/dto/creat-tea-bag-post.dto';
import { HttpException } from '@nestjs/common';

describe('SearchMinterService', () => {
  let service: SearchMinterService;
  let minterRepository: Repository<MinterEntity>;
  let teaBagRepository: Repository<TeaBagEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SearchMinterService,
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

    service = module.get<SearchMinterService>(SearchMinterService);
    minterRepository = module.get<Repository<MinterEntity>>(getRepositoryToken(MinterEntity));
    teaBagRepository = module.get<Repository<TeaBagEntity>>(getRepositoryToken(TeaBagEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createMinter', () => {
    it('should create and return the minter', async () => {
      const createDto: CreateMinterPostDto = {
        email: 'minter@example.com',
        password: 'securePassword123',
        username: 'minterUser',
        phone: '123-456-7890',
        location: 'Paris, France',
        profilBio: 'This is a minter bio',
        profilPicture: 'http://example.com/profile.jpg',
        role: 'minter',
        profilPrivate: 'false',
        profilLink: 'http://example.com/minterProfile',
        followers: 100,
        followered: 50,
        idTeaBag: 1,
        idNft: 101,
        idReport: 201,
      };
      const savedMinter = {
        id: 1,
        ...createDto,
      };

      jest.spyOn(minterRepository, 'save').mockResolvedValue(savedMinter as MinterEntity);

      expect(await service.createMinter(createDto)).toEqual(savedMinter);
    });

    it('should throw an error if save fails', async () => {
      const createDto: CreateMinterPostDto = {
        email: 'minter@example.com',
        password: 'securePassword123',
        username: 'minterUser',
        phone: '123-456-7890',
        location: 'Paris, France',
        profilBio: 'This is a minter bio',
        profilPicture: 'http://example.com/profile.jpg',
        role: 'minter',
        profilPrivate: 'false',
        profilLink: 'http://example.com/minterProfile',
        followers: 100,
        followered: 50,
        idTeaBag: 1,
        idNft: 101,
        idReport: 201,
      };

      jest.spyOn(minterRepository, 'save').mockRejectedValue(new Error('Failed to save'));

      await expect(service.createMinter(createDto)).rejects.toThrow(HttpException);
    });
  });

  describe('createTeaBag', () => {
    it('should create and return the tea bag', async () => {
      const createDto: CreateTeaBagPostDto = {
        username: 'teaBagUser',
        bio: 'This is a tea bag bio',
        link: 'http://example.com/teaBagProfile',
        location: 'London, UK',
        followers: 200,
        followered: 80,
        cookNumber: 5,
        whiteListe: 'whitelist1',
        whiteListeDate: new Date('2024-01-01T00:00:00Z'),
        idNft: 102,
      };
      const savedTeaBag = {
        id: 1,
        ...createDto,
      };

      jest.spyOn(teaBagRepository, 'save').mockResolvedValue(savedTeaBag as TeaBagEntity);

      expect(await service.createTeaBag(createDto)).toEqual(savedTeaBag);
    });

    it('should throw an error if save fails', async () => {
      const createDto: CreateTeaBagPostDto = {
        username: 'teaBagUser',
        bio: 'This is a tea bag bio',
        link: 'http://example.com/teaBagProfile',
        location: 'London, UK',
        followers: 200,
        followered: 80,
        cookNumber: 5,
        whiteListe: 'whitelist1',
        whiteListeDate: new Date('2024-01-01T00:00:00Z'),
        idNft: 102,
      };

      jest.spyOn(teaBagRepository, 'save').mockRejectedValue(new Error('Failed to save'));

      await expect(service.createTeaBag(createDto)).rejects.toThrow(HttpException);
    });
  });

  describe('getAllMinterAndTeaBag', () => {
    it('should return all minters and tea bags', async () => {
      const minters: MinterEntity[] = [
        {
          id: 1,
          email: 'minter1@example.com',
          password: 'password123',
          username: 'minterUser1',
          phone: '123-456-7890',
          location: 'Paris, France',
          profilBio: 'This is minter bio 1',
          profilPicture: 'http://example.com/profile1.jpg',
          role: 'minter',
          profilPrivate: 'false',
          profilLink: 'http://example.com/minterProfile1',
          followers: 150,
          followered: 75,
          idTeaBag: 2,
          idNft: 103,
          idReport: 202,
          permission: '',
          notifications: [],
          teabag: [],
          nfts: []
        },
      ];
      const teaBags: TeaBagEntity[] = [
        {
          id: 1,
          username: 'teaBagUser1',
          bio: 'This is tea bag bio 1',
          link: 'http://example.com/teaBagProfile1',
          location: 'London, UK',
          followers: 220,
          followered: 85,
          cookNumber: 6,
          whiteListe: 'whitelist2',
          whiteListeDate: new Date('2024-02-01T00:00:00Z'),
          idNft: 104,
          minter: new MinterEntity,
          nfts: []
        },
      ];

      jest.spyOn(minterRepository, 'find').mockResolvedValue(minters);
      jest.spyOn(teaBagRepository, 'find').mockResolvedValue(teaBags);

      expect(await service.getAllMinterAndTeaBag()).toEqual([...minters, ...teaBags]);
    });

    it('should throw an error if find fails', async () => {
      jest.spyOn(minterRepository, 'find').mockRejectedValue(new Error('Failed to find'));
      jest.spyOn(teaBagRepository, 'find').mockRejectedValue(new Error('Failed to find'));

      await expect(service.getAllMinterAndTeaBag()).rejects.toThrow(HttpException);
    });
  });
});
