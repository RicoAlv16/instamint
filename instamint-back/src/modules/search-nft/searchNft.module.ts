import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NtfsEntity } from 'src/shared/entities/nfts.entity';
import { SearchNftService } from './search-Nft.service';
import { SearchNftController } from './search-nft.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([NtfsEntity])
  ],
  controllers: [SearchNftController],
  providers: [SearchNftService]
})
export class SearchNftModule {}
