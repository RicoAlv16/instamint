import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ntfsGet')
export class NtfsEntity {
 
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: "test" })
  username: string;

  @Column({default: "test"})
  hashtag: string;

  @Column({default: "test"})
  description: string;

  @Column({default: "test"})
  location: string;

  @Column({default: "test"})
  picture: string;

  @Column({default: 0})
  price: number;

  @Column({default: "test"})
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