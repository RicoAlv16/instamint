import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateMinterPostDto } from 'src/shared/dto/creat-minter-post.dto';
import { SearchMinterService } from './search-minter.service';
import { CreateTeaBagPostDto } from 'src/shared/dto/creat-tea-bag-post.dto';

@Controller('search-minter')
export class SearchMinterController {
    constructor ( private readonly searchMinterService: SearchMinterService ) {}

    @Post()
    async createMinter(@Body() post: CreateMinterPostDto): Promise<CreateMinterPostDto> {
        return await this.searchMinterService.createMinter(post);
    }
    
    @Post('/teabag')
    async createTeaBag(@Body() post: CreateTeaBagPostDto): Promise<CreateTeaBagPostDto> {
        return await this.searchMinterService.createTeaBag(post);
    }
    
    @Get()
    getAllMinter() {
        return this.searchMinterService.getAllMinterAndTeaBag()
    }
}
