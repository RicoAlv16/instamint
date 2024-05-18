// update-user-data.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Minter } from '../../shared/entities/minter.entity';
import { UpdateMinterDto } from '../../shared/dto/update-minter-data.dto';

@Injectable()
export class UpdateUserDataService {
  constructor(
    @InjectRepository(Minter)
    private minterRepository: Repository<Minter>,
  ) {}

  async updateUser(updateMinterDto: UpdateMinterDto): Promise<Minter> {
    const minterId = 1;
    const minter = await this.minterRepository.findOne({ where: { id_minter: minterId } });

    if (minter) {
      if (updateMinterDto.username) {
        minter.username = updateMinterDto.username;
      }
      if (updateMinterDto.email) {
        minter.email = updateMinterDto.email;
      }
      if (updateMinterDto.bio) {
        minter.profile_bio = updateMinterDto.bio;
      }
      if (updateMinterDto.password) {
        minter.password = updateMinterDto.password;
      }
      if (updateMinterDto.pageLink) {
        minter.profile_link = updateMinterDto.pageLink;
      }
      if (updateMinterDto.profileImage) {
        
      }

      await this.minterRepository.save(minter);
      
      return minter;
    }

    throw new Error('User not found');
  }
}
