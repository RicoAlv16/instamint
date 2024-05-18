// minter.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Minter {
  @PrimaryGeneratedColumn()
  id_minter: number;

  @Column({ length: 50, nullable: false })
  email: string;

  @Column({ length: 50, nullable: false })
  password: string;

  @Column({ length: 50, nullable: false })
  username: string;

  @Column({ length: 50, nullable: true })
  tel: string;

  @Column({ length: 500, nullable: true })
  profile_bio: string;

  @Column({ type: 'bytea', nullable: true })
  profile_picture: Buffer;

  @Column({ length: 50, nullable: true })
  role: string;

  @Column({ nullable: false })
  profile_private: boolean;

  @Column({ length: 500, nullable: true })
  profile_link: string;

  @Column({ nullable: false })
  follower: number;

  @Column({ nullable: false })
  followed: number;
}

