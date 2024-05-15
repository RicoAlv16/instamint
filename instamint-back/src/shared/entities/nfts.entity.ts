import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
