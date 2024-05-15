import { SearchNftService } from './search-Nft.service';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateNftsPostDto } from 'src/shared/dto/create-nfts-post.dto';

@Controller('search-nft')
export class SearchNftController {
  constructor(private readonly searchNftService: SearchNftService) {}

  @Post()
  async createNfts(
    @Body() post: CreateNftsPostDto
  ): Promise<CreateNftsPostDto> {
    return await this.searchNftService.createNfts(post);
  }

  @Get()
  getAllNfts() {
    return this.searchNftService.getAllNfts();
  }
}
