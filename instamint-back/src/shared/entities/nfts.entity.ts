import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { MinterEntity } from './minter.entity';
import { TeaBagEntity } from './tea-bag.entity';

@Entity('nftsGet')
export class NftsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  username: string;

  @Column({ default: '' })
  hashtag: string;

  @Column({ default: '' })
  description: string;

  @Column({ default: '' })
  location: string;

  @Column({ default: '' })
  picture: string;

  @Column({ default: 0 })
  price: number;

  @Column({ default: '' })
  link: string;

  @Column({ default: 0 })
  mintNumber: number;

  @Column({ default: 0 })
  dismintNumber: number;

  @Column({ default: true })
  isBuyable: boolean;

  @Column({ nullable: true })
  idComment: number;
  
  @ManyToOne(() => MinterEntity, (minter) => minter.nfts, {
    eager: true,
    nullable: true,
  })
  minter: MinterEntity;

  @ManyToOne(() => TeaBagEntity, (teabag) => teabag.nfts, {
    eager: true,
    nullable: true,
  })
  teabag: TeaBagEntity;
}