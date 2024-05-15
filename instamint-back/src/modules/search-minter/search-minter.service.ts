import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MinterEntity } from 'src/shared/entities/minter.entity';
import { CreateMinterPostDto } from 'src/shared/dto/creat-minter-post.dto';
import { TeaBagEntity } from 'src/shared/entities/tea-bag.entity';
import { CreateTeaBagPostDto } from 'src/shared/dto/creat-tea-bag-post.dto';

@Injectable()
export class SearchMinterService {
  constructor(
    @InjectRepository(MinterEntity)
    private readonly minterPostRepository: Repository<MinterEntity>,

    @InjectRepository(TeaBagEntity)
    private readonly teaBagPostRepository: Repository<TeaBagEntity>
  ) {}

  async createMinter(
    minterPost: CreateMinterPostDto
  ): Promise<CreateMinterPostDto> {
    try {
      const savedMinter = await this.minterPostRepository.save(minterPost);
      return savedMinter;
    } catch (error) {
      throw new HttpException(
        `Error saving Minter: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async createTeaBag(
    teaBagPost: CreateTeaBagPostDto
  ): Promise<CreateTeaBagPostDto> {
    try {
      const savedTeaBag = await this.teaBagPostRepository.save(teaBagPost);
      return savedTeaBag;
    } catch (error) {
      throw new HttpException(
        `Error saving TeaBag: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async getAllMinterAndTeaBag(): Promise<Array<MinterEntity | TeaBagEntity>> {
    try {
      const findMinter = await this.minterPostRepository.find();
      const findTeaBag = await this.teaBagPostRepository.find();
      return [...findMinter, ...findTeaBag];
    } catch (error) {
      throw new HttpException(
        `Error getting Minter and TeaBag: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
