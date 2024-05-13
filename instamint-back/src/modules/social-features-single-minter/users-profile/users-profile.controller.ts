import { Controller, Get, Logger, NotFoundException, Param, ParseIntPipe, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { UsersProfileService } from './users-profile.service';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { PermissionsGuard } from 'src/guards/permissions/permissions.guard';
import { RolesGuard } from 'src/guards/roles/roles.guard';
import { Permission } from 'src/decorators/permission/permission.decorator';
import { Role } from 'src/decorators/role/role.decorator';
import { PermissionEnum } from 'src/shared/enums/permission.enum';
import { RoleEnum } from 'src/shared/enums/role.enum';
import { CreateMinterPostDto } from 'src/shared/dto/creat-minter-post.dto';
import { CreateTeaBagPostDto } from 'src/shared/dto/creat-tea-bag-post.dto';

@Controller('users-profile')
export class UsersProfileController {
    constructor( private usersProfileService: UsersProfileService,  private logger: Logger ){
    this.logger = new Logger('search-minter');
}
    
    @Get('/all-minters')
    @UseGuards(AuthGuard, RolesGuard, PermissionsGuard)
    @Role([RoleEnum.ADMIN, RoleEnum.MINTER, RoleEnum.TEABAG])
    @Permission([PermissionEnum.VIEW_NFTS, PermissionEnum.VIEW_MINTER])
    getAllMinters(@Query(ValidationPipe) getMinterPostDto: CreateMinterPostDto) {
        this.logger.verbose(
            `getting minter group with data: ${JSON.stringify(getMinterPostDto)}`
        );
        return this.usersProfileService.getAllMinters()
    }

    @Get('/all-teabags')
    @UseGuards(AuthGuard, RolesGuard, PermissionsGuard)
    @Role([RoleEnum.ADMIN, RoleEnum.MINTER, RoleEnum.TEABAG])
    @Permission([PermissionEnum.VIEW_NFTS, PermissionEnum.VIEW_MINTER])
    getAllTeaBags(@Query(ValidationPipe) getTeaBagPostDto: CreateTeaBagPostDto) {
        this.logger.verbose(
            `getting tea bag group with data: ${JSON.stringify(getTeaBagPostDto)}`
        );
        return this.usersProfileService.getAllTeaBags()
    }
    
    @Get('user/:idMinter')
    @UseGuards(AuthGuard, RolesGuard, PermissionsGuard)
    @Role([RoleEnum.ADMIN, RoleEnum.MINTER, RoleEnum.TEABAG])
    @Permission([PermissionEnum.VIEW_NFTS, PermissionEnum.VIEW_MINTER])
    getTeaBagByMinter(@Param('idMinter', ParseIntPipe) idMinter: number, @Query(ValidationPipe) getTeaBagPostDto: CreateTeaBagPostDto) {
        try{
            this.logger.verbose(
                `getting tea bag group with data: ${JSON.stringify(getTeaBagPostDto)} by ${
                    idMinter
                  }`
            );
            return this.usersProfileService.getTeaBagByMinter(idMinter);
        } catch (error) {
            throw new NotFoundException(error.message)
        }
    }
}
