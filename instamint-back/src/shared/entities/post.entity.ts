import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { File } from './file.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  message: string;

  @ManyToOne(() => File, (file) => file.posts)
  file: File;
}
