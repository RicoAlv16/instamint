import { Body, Controller, Get, Logger, NotFoundException, Param, ParseIntPipe, Post, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { CreateNotificationsPostDto } from 'src/shared/dto/creat-notifications-post.dto';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { PermissionsGuard } from 'src/guards/permissions/permissions.guard';
import { RolesGuard } from 'src/guards/roles/roles.guard';
import { PermissionEnum } from 'src/shared/enums/permission.enum';
import { RoleEnum } from 'src/shared/enums/role.enum';
import { Permission } from 'src/decorators/permission/permission.decorator';
import { Role } from 'src/decorators/role/role.decorator';

@Controller('notifications')
export class NotificationsController {

    constructor ( private readonly notificationsService: NotificationsService, private logger: Logger ) {
        this.logger = new Logger('notifications');
    }

    @Post()
    @UseGuards(AuthGuard, RolesGuard, PermissionsGuard)
    @Role([RoleEnum.ADMIN, RoleEnum.MINTER])
    @Permission([PermissionEnum.CREATE_NOTIFICATIONS])
    async createNfts(@Body() post: CreateNotificationsPostDto): Promise<CreateNotificationsPostDto> {
        this.logger.verbose(
            `Creating notifications group with data: ${JSON.stringify(post)}`
        );
        return await this.notificationsService.createNotifications(post);
    }
    
    @Get('notifications')
    @UseGuards(AuthGuard, RolesGuard, PermissionsGuard)
    @Role([RoleEnum.ADMIN, RoleEnum.MINTER])
    @Permission([PermissionEnum.VIEW_NOTIFICATIONS])
    getAllNotifications(@Query(ValidationPipe) createNotificationsPostDto: CreateNotificationsPostDto) {
        this.logger.verbose(
            `getting notifications group with data: ${JSON.stringify(createNotificationsPostDto)}`
        );
        return this.notificationsService.getAllNotifications()
    }

    @Get('minter-notifications/:idMinter')
    @UseGuards(AuthGuard, RolesGuard, PermissionsGuard)
    @Role([RoleEnum.ADMIN, RoleEnum.MINTER])
    @Permission([PermissionEnum.VIEW_NOTIFICATIONS])
    async getNotificationsByMinter(@Param('idMinter', ParseIntPipe) idMinter: number, 
    @Query(ValidationPipe) createNotificationsPostDto: CreateNotificationsPostDto) {
        try {
            this.logger.verbose(
                `getting  all notifications with data: ${JSON.stringify(createNotificationsPostDto)} by ${
                    idMinter
                  }`,
              );
            return this.notificationsService.getNotificationsByMinter(idMinter);
        } catch (error) {
        throw new NotFoundException(error.message);
        }
    }
}

