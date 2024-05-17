import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotificationsService } from './notifications.service';
import { NotificationsEntity } from 'src/shared/entities/notifications.entity';
import { CreateNotificationsPostDto } from 'src/shared/dto/creat-notifications-post.dto';
import { HttpException } from '@nestjs/common';
import { MinterEntity } from 'src/shared/entities/minter.entity';

describe('NotificationsService', () => {
  let service: NotificationsService;
  let repository: Repository<NotificationsEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotificationsService,
        {
          provide: getRepositoryToken(NotificationsEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<NotificationsService>(NotificationsService);
    repository = module.get<Repository<NotificationsEntity>>(getRepositoryToken(NotificationsEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createNotifications', () => {
    it('should create and return the notification', async () => {
      const createDto: CreateNotificationsPostDto = {
        idMinter: 0,
        idNft: 0,
        activities: '',
        type: '',
        link: '',
        status: '',
        notifDate: new Date
      };
      const savedNotification = {
        // les propriétés de l'entité NotificationsEntity ici
      };

      jest.spyOn(repository, 'save').mockResolvedValue(savedNotification as NotificationsEntity);

      expect(await service.createNotifications(createDto)).toEqual(savedNotification);
    });

    it('should throw an error if save fails', async () => {
      const createDto: CreateNotificationsPostDto = {
        idMinter: 0,
        idNft: 0,
        activities: '',
        type: '',
        link: '',
        status: '',
        notifDate: new Date
      };

      jest.spyOn(repository, 'save').mockRejectedValue(new Error('Failed to save'));

      await expect(service.createNotifications(createDto)).rejects.toThrow(HttpException);
    });
  });

  describe('getAllNotifications', () => {
    it('should return all notifications', async () => {
      const notifications: NotificationsEntity[] = [
        {
          id: 1,
          idMinter: 12,
          idNft: 97,
          activities: 'has like your post',
          type: 'like',
          link: 'test link',
          status: 'pending',
          notifDate: new Date('2023-04-01T00:00:00Z'),
          minter: new MinterEntity
        },
        {
          id: 2,
          idMinter: 1,
          idNft: 33,
          activities: 'has follow you',
          type: 'follow',
          link: 'test link',
          status: 'open',
          notifDate: new Date('2023-04-01T00:00:00Z'),
          minter: new MinterEntity
        },
      ];

      jest.spyOn(repository, 'find').mockResolvedValue(notifications);

      expect(await service.getAllNotifications()).toEqual(notifications);
    });

    it('should throw an error if find fails', async () => {
      jest.spyOn(repository, 'find').mockRejectedValue(new Error('Failed to find'));

      await expect(service.getAllNotifications()).rejects.toThrow(HttpException);
    });
  });

  describe('getNotificationsByMinter', () => {
    it('should return notifications by minter id', async () => {
      const idMinter = 1;
      const notifications = [
        {
          id: 2,
          idMinter: 1,
          idNft: 33,
          activities: 'has follow you',
          type: 'follow',
          link: 'test link',
          status: 'open',
          notifDate: new Date('2023-04-01T00:00:00Z'),
          minter: new MinterEntity
        }
      ];

      jest.spyOn(repository.createQueryBuilder('n'), 'getRawMany').mockResolvedValue(notifications);

      expect(await service.getNotificationsByMinter(idMinter)).toEqual(notifications);
    });
  });
});
