import { Module } from '@nestjs/common';
import { SearchMinterService } from './search-minter.service';
import { SearchMinterController } from './search-minter.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MinterEntity } from 'src/shared/entities/minter.entity';
import { TeaBagEntity } from 'src/shared/entities/tea-bag.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([MinterEntity]),
    TypeOrmModule.forFeature([TeaBagEntity]),
  ],
  providers: [SearchMinterService],
  controllers: [SearchMinterController],
})
export class SearchMinterModule {}
