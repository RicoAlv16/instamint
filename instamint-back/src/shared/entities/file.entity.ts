import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Post } from './post.entity';

@Entity()
export class File {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  filename: string;

  @Column({ type: 'bytea' })
  data: Buffer;

  @OneToMany(() => Post, (post) => post.file)
  posts: Post[];
}
