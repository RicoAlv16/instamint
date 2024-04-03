import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('minterGet')
export class MinterEntity {
 
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: "test" })
  email: string;

  @Column({default: "test"})
  password: string;

  @Column({default: "test"})
  username: string;

  @Column({default: "test"})
  phone: string;

  @Column({default: "test"})
  location: string;

  @Column({default: "test"})
  profilBio: string;

  @Column({default: "test"})
  profilPicture: string;

  @Column({default: "test"})
  role: string;

  @Column({ default: "test" })
  profilPrivate: string;

  @Column({ default: "test" })
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
  
}