import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { MinterEntity } from './minter.entity';
import { NtfsEntity } from './nfts.entity';

@Entity('teaBagGet')
export class TeaBagEntity {
 
  @PrimaryGeneratedColumn()
  id: number;

  @Column({default: "test"})
  username: string;

  @Column({default: "test"})
  bio: string;

  @Column({default: "test"})
  link: string;

  @Column({default: "Paris"})
  location: string;

  @Column({ default: 0 })
  followers: number;

  @Column({ default: 0 })
  followered: number;

  @Column({ default: 0 })
  cookNumber: number;

  @Column({ default: "test" })
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