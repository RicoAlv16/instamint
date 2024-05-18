import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UpdateUserDataController } from './update-minter-data.controller';
import { UpdateUserDataService } from './update-minter-data.service';
import { Minter } from '../../shared/entities/minter.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Minter])],
  controllers: [UpdateUserDataController],
  providers: [UpdateUserDataService],
})
export class UpdateUserDataModule {}