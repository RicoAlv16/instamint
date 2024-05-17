import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateNotificationsPostDto } from 'src/shared/dto/creat-notifications-post.dto';
import { NotificationsEntity } from 'src/shared/entities/notifications.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NotificationsService {

    constructor (
        @InjectRepository(NotificationsEntity)
        private readonly notificationsPostRepository: Repository<NotificationsEntity>
    ) {}

    async createNotifications(notificationsPost: CreateNotificationsPostDto): Promise<CreateNotificationsPostDto> {
        try {
            const savedNotifications = await this.notificationsPostRepository.save(notificationsPost);
            return savedNotifications;
        } catch (error) {
            throw new HttpException(`Error saving Notifications: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getAllNotifications(): Promise<NotificationsEntity[]> {
        try {
            const findNotifications = await this.notificationsPostRepository.find();
            return findNotifications;
        } catch (error) {
            throw new HttpException(`Error getting Notifications: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    async getNotificationsByMinter(idMinter: number): Promise<NotificationsEntity[]> {
        return this.notificationsPostRepository
          .createQueryBuilder('n')
          .leftJoinAndSelect('n.minter', 'm')
          .where('n.idMinter = :idMinter', { idMinter })
          .select([
            'n.*',
            'm.username as minterUserName',
            'EXTRACT(DAY FROM (NOW() - n.notifDate)) as dayNumber'
          ])
          .groupBy('n.id, m.id')
          .getRawMany();
    }
}
