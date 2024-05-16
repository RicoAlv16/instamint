import { Permission } from 'src/decorators/permission/permission.decorator';
import { Role } from 'src/decorators/role/role.decorator';
import { SearchNftService } from './search-Nft.service';
import { Body, Controller, Get, Logger, Post, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { PermissionsGuard } from 'src/guards/permissions/permissions.guard';
import { RolesGuard } from 'src/guards/roles/roles.guard';
import { CreateNftsPostDto } from 'src/shared/dto/create-nfts-post.dto';
import { PermissionEnum } from 'src/shared/enums/permission.enum';
import { RoleEnum } from 'src/shared/enums/role.enum';

@Controller('search-nft')
export class SearchNftController {

    constructor ( private readonly searchNftService: SearchNftService, private logger: Logger ) {
        this.logger = new Logger('search-nft');
    }

    @Post()
    @UseGuards(AuthGuard, RolesGuard, PermissionsGuard)
    @Role([RoleEnum.MINTER])
    @Permission([PermissionEnum.CREATE_NFTS])
    async createNfts(@Body() post: CreateNftsPostDto): Promise<CreateNftsPostDto> {
        this.logger.verbose(
            `Creating Nfts group with data: ${JSON.stringify(CreateNftsPostDto)}`
        );
        return await this.searchNftService.createNfts(post);
    }
    
    @Get()
    @UseGuards(AuthGuard, RolesGuard, PermissionsGuard)
    @Role([RoleEnum.ADMIN, RoleEnum.MINTER])
    @Permission([PermissionEnum.VIEW_NFTS])
    getAllNfts(@Query(ValidationPipe) getNftsPostDto: CreateNftsPostDto) {
        this.logger.verbose(
            `getting nfts group with data: ${JSON.stringify(getNftsPostDto)}`
        );
        return this.searchNftService.getAllNfts()
    }
}
