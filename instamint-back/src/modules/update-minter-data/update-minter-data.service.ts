import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
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

    if (!minter) {
      throw new NotFoundException('User not found');
    }

    if (updateMinterDto.username) {
      const existingUser = await this.minterRepository.findOne({ where: { username: updateMinterDto.username } });
      if (existingUser && existingUser.id_minter !== minterId) {
        throw new ConflictException('Username already exists');
      }
      minter.username = updateMinterDto.username;
    }

    if (updateMinterDto.email) {
      const existingEmail = await this.minterRepository.findOne({ where: { email: updateMinterDto.email } });
      if (existingEmail && existingEmail.id_minter !== minterId) {
        throw new ConflictException('Email already exists');
      }
      minter.email = updateMinterDto.email;
    }

    if (updateMinterDto.bio) {
      minter.profile_bio = updateMinterDto.bio;
    }

    if (updateMinterDto.password) {
      minter.password = updateMinterDto.password;
    }

    if (updateMinterDto.pageLink) {
      const existingProfileLink = await this.minterRepository.findOne({ where: { profile_link: updateMinterDto.pageLink } });
      if (existingProfileLink && existingProfileLink.id_minter !== minterId) {
        throw new ConflictException('Profile link already exists');
      }
      minter.profile_link = updateMinterDto.pageLink;
    }

    if (updateMinterDto.profileImage) {
    }

    await this.minterRepository.save(minter);

    return minter;
  }
}