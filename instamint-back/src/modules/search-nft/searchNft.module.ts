import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NftsEntity } from 'src/shared/entities/nfts.entity';
import { SearchNftService } from './search-Nft.service';
import { SearchNftController } from './search-nft.controller';

@Module({
  imports: [TypeOrmModule.forFeature([NftsEntity])],
  controllers: [SearchNftController],
  providers: [SearchNftService],
})
export class SearchNftModule {}
