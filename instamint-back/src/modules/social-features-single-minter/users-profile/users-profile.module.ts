import { Module } from '@nestjs/common';
import { UsersProfileController } from './users-profile.controller';
import { UsersProfileService } from './users-profile.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MinterEntity } from 'src/shared/entities/minter.entity';
import { TeaBagEntity } from 'src/shared/entities/tea-bag.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([MinterEntity]),
    TypeOrmModule.forFeature([TeaBagEntity])
  ],
  controllers: [UsersProfileController],
  providers: [UsersProfileService]
})
export class UsersProfileModule {}
