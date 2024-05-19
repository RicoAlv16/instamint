import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NtfsEntity } from 'src/shared/entities/nfts.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MintersProfileWithNftsListService {

    constructor (
        @InjectRepository(NtfsEntity)
        private readonly nftsPostRepository: Repository<NtfsEntity>
    ) {}

    async getNftsByMinter(idMinter: number): Promise<NtfsEntity[]> {
        try {
            return this.nftsPostRepository
            .createQueryBuilder('n')
            .leftJoinAndSelect('n.minter', 'm')
            .where('n.minterId = :idMinter', { idMinter })
            .select([
                'n.*'
            ])
            .groupBy('n.id, m.id')
            .orderBy('n.id')
            .getRawMany();
        } catch (error) {
            throw new HttpException(`Error getting nfts of minter: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getNftsByTeaBag(idTeaBag: number): Promise<NtfsEntity[]> {
        try {
            return this.nftsPostRepository
            .createQueryBuilder('n')
            .leftJoinAndSelect('n.teabag', 't')
            .where('n.teabagId = :idTeaBag', { idTeaBag })
            .select([
                'n.*'
            ])
            .groupBy('n.id, t.id')
            .orderBy('n.id')
            .getRawMany();
        } catch (error) {
            throw new HttpException(`Error getting nfts of tea bag: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
