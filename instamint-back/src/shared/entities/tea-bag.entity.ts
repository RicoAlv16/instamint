import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { MinterEntity } from './minter.entity';
import { NtfsEntity } from './nfts.entity';

@Entity('teaBagGet')
export class TeaBagEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  username: string;

  @Column({ default: '' })
  bio: string;

  @Column({ default: '' })
  link: string;

  @Column({ default: '' })
  location: string;

  @Column({ default: 0 })
  followers: number;

  @Column({ default: 0 })
  followered: number;

  @Column({ default: 0 })
  cookNumber: number;

  @Column({ default: '' })
  whiteListe: string;

  @Column()
  whiteListeDate: Date;

  @Column({ default: 0 })
  idNft: number;

  @ManyToOne(() => MinterEntity, (minter) => minter.teabag, {
    eager: true,
    nullable: true,
  })
  minter: MinterEntity;

  @OneToMany(() => NtfsEntity, (nfts) => nfts.teabag)
  nfts: NtfsEntity[];
}