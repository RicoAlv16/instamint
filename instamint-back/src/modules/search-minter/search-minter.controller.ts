import { Body, Controller, Get, Logger, Post, UseGuards } from '@nestjs/common';
import { CreateMinterPostDto } from 'src/shared/dto/creat-minter-post.dto';
import { SearchMinterService } from './search-minter.service';
import { CreateTeaBagPostDto } from 'src/shared/dto/creat-tea-bag-post.dto';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { PermissionsGuard } from 'src/guards/permissions/permissions.guard';
import { RolesGuard } from 'src/guards/roles/roles.guard';
import { Permission } from 'src/decorators/permission/permission.decorator';
import { Role } from 'src/decorators/role/role.decorator';
import { PermissionEnum } from 'src/shared/enums/permission.enum';
import { RoleEnum } from 'src/shared/enums/role.enum';

@Controller('search-minter')
export class SearchMinterController {
    constructor ( private readonly searchMinterService: SearchMinterService, private logger: Logger  ) {
    this.logger = new Logger('search-minter');
    }

    @Post()
    @UseGuards(AuthGuard, RolesGuard, PermissionsGuard)
    @Role([RoleEnum.ADMIN, RoleEnum.MINTER])
    @Permission([PermissionEnum.CREATE_MINTER])
    async createMinter(@Body() post: CreateMinterPostDto): Promise<CreateMinterPostDto> {
        this.logger.verbose(
            `Creating minter group with data: ${JSON.stringify(CreateMinterPostDto)}`
        );
        return await this.searchMinterService.createMinter(post);
    }
    
    @Post('/teabag')
    @UseGuards(AuthGuard, RolesGuard, PermissionsGuard)
    @Role([RoleEnum.ADMIN, RoleEnum.MINTER])
    @Permission([PermissionEnum.CREATE_TEABAG])
    async createTeaBag(@Body() post: CreateTeaBagPostDto): Promise<CreateTeaBagPostDto> {
        this.logger.verbose(
            `Creating tea bag group with data: ${JSON.stringify(CreateTeaBagPostDto)}`
        );
        return await this.searchMinterService.createTeaBag(post);
    }
    
    @Get()
    @UseGuards(AuthGuard, RolesGuard, PermissionsGuard)
    @Role([RoleEnum.ADMIN, RoleEnum.MINTER])
    @Permission([PermissionEnum.VIEW_MINTER, PermissionEnum.VIEW_TEABAG])
    getAllMinter() {
        return this.searchMinterService.getAllMinterAndTeaBag()
    }
}
