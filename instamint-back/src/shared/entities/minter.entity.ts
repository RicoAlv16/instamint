import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { NotificationsEntity } from './notifications.entity';
import { TeaBagEntity } from './tea-bag.entity';
import { NtfsEntity } from './nfts.entity';

@Entity('minterGet')
export class MinterEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  email: string;

  @Column({ default: '' })
  password: string;

  @Column({ default: '' })
  username: string;

  @Column({ default: '' })
  phone: string;

  @Column({ default: '' })
  location: string;

  @Column({ default: '' })
  profilBio: string;

  @Column({ default: '' })
  profilPicture: string;

  @Column({default: "minter"})
  role: string;

  @Column({default: "ReadOnly"})
  permission: string;

  @Column({ default: "test" })
  profilPrivate: string;

  @Column({ default: '' })
  profilLink: string;

  @Column({ default: 0 })
  followers: number;

  @Column({ default: 0 })
  followered: number;

  @Column({ default: 0 })
  idTeaBag: number;

  @Column({ default: 0 })
  idNft: number;

  @Column({ default: 0 })
  idReport: number;

  @OneToMany(() => NotificationsEntity, notification => notification.minter)
  notifications: NotificationsEntity[];

  isActive: boolean;

  @OneToMany(() => TeaBagEntity, (teabag) => teabag.minter)
  teabag: TeaBagEntity[];

  @OneToMany(() => NtfsEntity, (nfts) => nfts.minter)
  nfts: NtfsEntity[]; 
}