import { Module } from '@nestjs/common';
import { MintersProfileWithNftsListController } from './minters-profile-with-nfts-list.controller';
import { MintersProfileWithNftsListService } from './minters-profile-with-nfts-list.service';
import { NtfsEntity } from 'src/shared/entities/nfts.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([NtfsEntity]),
  ],
  controllers: [MintersProfileWithNftsListController],
  providers: [MintersProfileWithNftsListService]
})
export class MintersProfileWithNftsListModule {}
