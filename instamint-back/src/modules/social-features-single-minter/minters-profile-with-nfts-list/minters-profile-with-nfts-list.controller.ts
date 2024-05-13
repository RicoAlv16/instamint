import { Controller, Get, NotFoundException, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { MintersProfileWithNftsListService } from './minters-profile-with-nfts-list.service';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { PermissionsGuard } from 'src/guards/permissions/permissions.guard';
import { RolesGuard } from 'src/guards/roles/roles.guard';
import { Permission } from 'src/decorators/permission/permission.decorator';
import { Role } from 'src/decorators/role/role.decorator';
import { PermissionEnum } from 'src/shared/enums/permission.enum';
import { RoleEnum } from 'src/shared/enums/role.enum';

@Controller('minters-profile-with-nfts-list')
export class MintersProfileWithNftsListController {

    constructor ( private readonly mintersProfileWithNftsListService: MintersProfileWithNftsListService ) {}

    @Get('minter-nfts-list/:idMinter')
    @UseGuards(AuthGuard, RolesGuard, PermissionsGuard)
    @Role([RoleEnum.ADMIN, RoleEnum.MINTER, RoleEnum.TEABAG])
    @Permission([PermissionEnum.VIEW_NFTS, PermissionEnum.VIEW_MINTER])
    async getNftsByMinter(@Param('idMinter', ParseIntPipe) idMinter: number) {
        try {
            return this.mintersProfileWithNftsListService.getNftsByMinter(idMinter);
        } catch (error) {
        throw new NotFoundException(error.message);
        }
    }

    @Get('teabag-nfts-list/:idTeaBag')
    @UseGuards(AuthGuard, RolesGuard, PermissionsGuard)
    @Role([RoleEnum.ADMIN, RoleEnum.MINTER, RoleEnum.TEABAG])
    @Permission([PermissionEnum.VIEW_NFTS, PermissionEnum.VIEW_TEABAG])
    async getNftsByTeaBag(@Param('idTeaBag', ParseIntPipe) idTeaBag: number) {
        try {
            return this.mintersProfileWithNftsListService.getNftsByTeaBag(idTeaBag);
        } catch (error) {
        throw new NotFoundException(error.message);
        }
    }
}

