import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MintersProfileWithNftsListService } from './minters-profile-with-nfts-list.service';
import { NtfsEntity } from 'src/shared/entities/nfts.entity';
import { HttpException } from '@nestjs/common';
import { MinterEntity } from 'src/shared/entities/minter.entity';
import { TeaBagEntity } from 'src/shared/entities/tea-bag.entity';

describe('MintersProfileWithNftsListService', () => {
  let service: MintersProfileWithNftsListService;
  let nftsRepository: Repository<NtfsEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MintersProfileWithNftsListService,
        {
          provide: getRepositoryToken(NtfsEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<MintersProfileWithNftsListService>(MintersProfileWithNftsListService);
    nftsRepository = module.get<Repository<NtfsEntity>>(getRepositoryToken(NtfsEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getNftsByMinter', () => {
    it('should return NFTs by minter', async () => {
      const idMinter = 1;
      const nfts: NtfsEntity[] = [
        {
          id: 1,
          username: 'nftUser1',
          hashtag: '#example1',
          description: 'This is the first example NFT',
          location: 'Paris, France',
          picture: 'http://example.com/nft1.jpg',
          price: 1000,
          link: 'http://example.com/nft1',
          mintNumber: 1,
          dismintNumber: 0,
          isBuyable: true,
          idComment: 123,
          minter: new MinterEntity,
          teabag: new TeaBagEntity
        },
        {
          id: 2,
          username: 'nftUser2',
          hashtag: '#example2',
          description: 'This is the second example NFT',
          location: 'London, UK',
          picture: 'http://example.com/nft2.jpg',
          price: 2000,
          link: 'http://example.com/nft2',
          mintNumber: 2,
          dismintNumber: 0,
          isBuyable: true,
          idComment: 456,
          minter: new MinterEntity,
          teabag: new TeaBagEntity
        },
      ];

      jest.spyOn(nftsRepository, 'createQueryBuilder').mockImplementation(() => ({
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        groupBy: jest.fn().mockReturnThis(),
        orderBy: jest.fn().mockReturnThis(),
        getRawMany: jest.fn().mockResolvedValue(nfts),
      }) as any);

      expect(await service.getNftsByMinter(idMinter)).toEqual(nfts);
    });

    it('should throw an error if there is an issue', async () => {
      const idMinter = 1;

      jest.spyOn(nftsRepository, 'createQueryBuilder').mockImplementation(() => ({
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        groupBy: jest.fn().mockReturnThis(),
        orderBy: jest.fn().mockReturnThis(),
        getRawMany: jest.fn().mockRejectedValue(new Error('Error fetching NFTs')),
      }) as any);

      await expect(service.getNftsByMinter(idMinter)).rejects.toThrow(HttpException);
    });
  });

  describe('getNftsByTeaBag', () => {
    it('should return NFTs by tea bag', async () => {
      const idTeaBag = 1;
      const nfts: NtfsEntity[] = [
        {
          id: 1,
          username: 'nftUser1',
          hashtag: '#example1',
          description: 'This is the first example NFT',
          location: 'Paris, France',
          picture: 'http://example.com/nft1.jpg',
          price: 1000,
          link: 'http://example.com/nft1',
          mintNumber: 1,
          dismintNumber: 0,
          isBuyable: true,
          idComment: 123,
          minter: new MinterEntity,
          teabag: new TeaBagEntity
        },
        {
          id: 2,
          username: 'nftUser2',
          hashtag: '#example2',
          description: 'This is the second example NFT',
          location: 'London, UK',
          picture: 'http://example.com/nft2.jpg',
          price: 2000,
          link: 'http://example.com/nft2',
          mintNumber: 2,
          dismintNumber: 0,
          isBuyable: true,
          idComment: 456,
          minter: new MinterEntity,
          teabag: new TeaBagEntity
        },
      ];

      jest.spyOn(nftsRepository, 'createQueryBuilder').mockImplementation(() => ({
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        groupBy: jest.fn().mockReturnThis(),
        orderBy: jest.fn().mockReturnThis(),
        getRawMany: jest.fn().mockResolvedValue(nfts),
      }) as any);

      expect(await service.getNftsByTeaBag(idTeaBag)).toEqual(nfts);
    });

    it('should throw an error if there is an issue', async () => {
      const idTeaBag = 1;

      jest.spyOn(nftsRepository, 'createQueryBuilder').mockImplementation(() => ({
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        groupBy: jest.fn().mockReturnThis(),
        orderBy: jest.fn().mockReturnThis(),
        getRawMany: jest.fn().mockRejectedValue(new Error('Error fetching NFTs')),
      }) as any);

      await expect(service.getNftsByTeaBag(idTeaBag)).rejects.toThrow(HttpException);
    });
  });
});
