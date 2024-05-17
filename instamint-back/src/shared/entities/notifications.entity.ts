import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { MinterEntity } from './minter.entity';

@Entity('notificationsGet')
export class NotificationsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 0 })
  idMinter: number;

  @Column({ default: 0 })
  idNft: number;

  @Column({ default: '' })
  activities: string;

  @Column({ default: '' })
  type: string;

  @Column({ default: '' })
  link: string;

  @Column({ default: '' })
  status: string;

  @Column({ default: '' })
  notifDate: Date;

  @ManyToOne(() => MinterEntity, (minter) => minter.notifications, {
    eager: true,
    nullable: true,
  })
  minter: MinterEntity;
}
