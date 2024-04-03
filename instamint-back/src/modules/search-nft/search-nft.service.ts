import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NtfsEntity } from 'src/shared/entities/nfts.entity';
import { CreateNftsPostDto } from 'src/shared/dto/create-nfts-post.dto';

@Injectable()
export class SearchNftService {

    constructor (
        @InjectRepository(NtfsEntity)
        private readonly nftsPostRepository: Repository<NtfsEntity>,
    ) {}

    async createNfts(nftsPost: CreateNftsPostDto): Promise<CreateNftsPostDto> {
        try {
            const savedNft = await this.nftsPostRepository.save(nftsPost);
            return savedNft;
        } catch (error) {
            throw new HttpException(`Error saving NFT: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getAllNfts(): Promise<NtfsEntity[]> {
        try {
            const findNft = await this.nftsPostRepository.find();
            return findNft;
        } catch (error) {
            throw new HttpException(`Error getting NFT: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}