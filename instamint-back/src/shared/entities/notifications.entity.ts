import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { MinterEntity } from './minter.entity';

@Entity('notificationsGet')
export class NotificationsEntity {
 
  @PrimaryGeneratedColumn()
  id: number;

  @Column({default: 0})
  idMinter: number;

  @Column({default: 0})
  idNft: number;

  @Column({default: "test"})
  activities: string;

  @Column({default: "test"})
  type: string;

  @Column({default: "test"})
  link: string;

  @Column({default: "pending"})
  status: string;

  @Column({default: "2024-03-21 12:15:22"})
  notifDate: Date;

  @ManyToOne(() => MinterEntity, (minter) => minter.notifications, {
    eager: true,
    nullable: true,
  })
  minter: MinterEntity;

}