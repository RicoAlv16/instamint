import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MinterEntity } from 'src/shared/entities/minter.entity';
import { TeaBagEntity } from 'src/shared/entities/tea-bag.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersProfileService {

    constructor (
        @InjectRepository(MinterEntity)
        private readonly minterPostRepository: Repository<MinterEntity>,

        @InjectRepository(TeaBagEntity)
        private readonly teaBagPostRepository: Repository<TeaBagEntity>
    ) {}

    async getAllMinters(): Promise<MinterEntity[]> {
        try {
            const findMinters = await this.minterPostRepository.find();
            return findMinters;
        } catch (error) {
            throw new HttpException(`Error getting minters: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getAllTeaBags(): Promise<TeaBagEntity[]> {
        try {
            const findTeaBag = await this.teaBagPostRepository.find();
            return findTeaBag;
        } catch (error) {
            throw new HttpException(`Error getting all tea bag: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getTeaBagByMinter(idMinter: number): Promise<TeaBagEntity[]> {
        try {
            return this.teaBagPostRepository
            .createQueryBuilder('t')
            .leftJoinAndSelect('t.minter', 'm')
            .where('t.minterId = :idMinter', { idMinter })
            .select([
                't.*'
            ])
            .groupBy('t.id, m.id')
            .getRawMany();
        } catch (error) {
            throw new HttpException(`Error getting tea bag by minter: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
