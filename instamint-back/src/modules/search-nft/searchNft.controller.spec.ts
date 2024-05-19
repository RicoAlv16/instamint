import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SearchNftService } from './search-nft.service';
import { NtfsEntity } from 'src/shared/entities/nfts.entity';
import { CreateNftsPostDto } from 'src/shared/dto/create-nfts-post.dto';
import { HttpException } from '@nestjs/common';
import { MinterEntity } from 'src/shared/entities/minter.entity';
import { TeaBagEntity } from 'src/shared/entities/tea-bag.entity';

describe('SearchNftService', () => {
  let service: SearchNftService;
  let nftsRepository: Repository<NtfsEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SearchNftService,
        {
          provide: getRepositoryToken(NtfsEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<SearchNftService>(SearchNftService);
    nftsRepository = module.get<Repository<NtfsEntity>>(getRepositoryToken(NtfsEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createNfts', () => {
    it('should create and return the NFT', async () => {
      const createDto: CreateNftsPostDto = {
        username: 'nftUser',
        hashtag: '#example',
        description: 'This is an example NFT',
        location: 'Paris, France',
        picture: 'http://example.com/nft.jpg',
        price: 1000,
        link: 'http://example.com/nft',
        mintNumber: 1,
        dismintNumber: 0,
        isBuyable: true,
        idComment: 123,
      };
      const savedNft = {
        id: 1,
        ...createDto,
      };

      jest.spyOn(nftsRepository, 'save').mockResolvedValue(savedNft as NtfsEntity);

      expect(await service.createNfts(createDto)).toEqual(savedNft);
    });

    it('should throw an error if save fails', async () => {
      const createDto: CreateNftsPostDto = {
        username: 'nftUser',
        hashtag: '#example',
        description: 'This is an example NFT',
        location: 'Paris, France',
        picture: 'http://example.com/nft.jpg',
        price: 1000,
        link: 'http://example.com/nft',
        mintNumber: 1,
        dismintNumber: 0,
        isBuyable: true,
        idComment: 123,
      };

      jest.spyOn(nftsRepository, 'save').mockRejectedValue(new Error('Failed to save'));

      await expect(service.createNfts(createDto)).rejects.toThrow(HttpException);
    });
  });

  describe('getAllNfts', () => {
    it('should return all NFTs', async () => {
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

      jest.spyOn(nftsRepository, 'find').mockResolvedValue(nfts);

      expect(await service.getAllNfts()).toEqual(nfts);
    });

    it('should throw an error if find fails', async () => {
      jest.spyOn(nftsRepository, 'find').mockRejectedValue(new Error('Failed to find'));

      await expect(service.getAllNfts()).rejects.toThrow(HttpException);
    });
  });
});
