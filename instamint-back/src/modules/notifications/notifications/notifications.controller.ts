import { Body, Controller, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { CreateNotificationsPostDto } from 'src/shared/dto/creat-notifications-post.dto';

@Controller('notifications')
export class NotificationsController {

    constructor ( private readonly notificationsService: NotificationsService ) {}

    @Post()
    async createNfts(@Body() post: CreateNotificationsPostDto): Promise<CreateNotificationsPostDto> {
        return await this.notificationsService.createNotifications(post);
    }
    
    @Get('nono')
    getAllNfts() {
        return this.notificationsService.getAllNotifications()
    }

    @Get('minter-notifications/:idMinter')
    async getNotificationsByMinter(@Param('idMinter') idMinter: string) {
        try {
            return this.notificationsService.getNotificationsByMinter(parseInt(idMinter, 10));
        } catch (error) {
        throw new NotFoundException(error.message);
        }
    }
}
