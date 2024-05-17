import { NotFoundException } from '@nestjs/common';
import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { InjectRepository } from '@nestjs/typeorm';
import { TeaBagEntity } from 'src/shared/entities/tea-bag.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TeaBagAdminService {
  constructor(
    @InjectRepository(TeaBagEntity)
    private teabagRepository: Repository<TeaBagEntity>,
  ) {}

  async deleteTeaBag(id: number): Promise<void> {
    const result = await this.teabagRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`TeaBag with ID ${id} not found`);
    }
  }
}
