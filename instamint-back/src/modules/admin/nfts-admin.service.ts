import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NftsEntity } from 'src/shared/entities/nfts.entity';

@Injectable()
export class NftsAdminService {
  constructor(
    @InjectRepository(NftsEntity)
    private nftsRepository: Repository<NftsEntity>
  ) {}

  async deleteNft(id: number): Promise<void> {
    const result = await this.nftsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`NFT with ID ${id} not found`);
    }
  }
}
