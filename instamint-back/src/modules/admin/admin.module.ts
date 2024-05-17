import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminController } from './admin.controller';
import { MinterAdminService } from './minter-admin.service';
import { TeaBagAdminService } from './teabag-admin.service';
import { NftsAdminService } from './nfts-admin.service';
import { MinterEntity } from 'src/shared/entities/minter.entity';
import { TeaBagEntity } from 'src/shared/entities/tea-bag.entity';
import { NftsEntity } from 'src/shared/entities/nfts.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MinterEntity, TeaBagEntity, NftsEntity])],
  controllers: [AdminController],
  providers: [MinterAdminService, TeaBagAdminService, NftsAdminService],
})
export class AdminModule {}
