import { NotFoundException } from '@nestjs/common';
import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { InjectRepository } from '@nestjs/typeorm';
import { MinterEntity } from 'src/shared/entities/minter.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MinterAdminService {
  constructor(
    @InjectRepository(MinterEntity)
    private minterRepository: Repository<MinterEntity>,
  ) {}

  async disableMinter(id: number): Promise<void> {
    const minter = await this.minterRepository.findOneBy({ id });
    if (!minter) {
      throw new NotFoundException(`Minter with ID ${id} not found`);
    }
    minter.isActive = false;
    await this.minterRepository.save(minter);
  }
}
