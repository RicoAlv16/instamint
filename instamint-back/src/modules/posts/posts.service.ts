import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../../shared/entities/post.entity';
import { File } from '../../shared/entities/file.entity';
import { Multer } from 'multer';


@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
    
    @InjectRepository(File)
    private filesRepository: Repository<File>,
  ) {}

  async createPost(file: Express.Multer.File, message: string): Promise<Post> {
    const newFile = this.filesRepository.create({
      filename: file.originalname,
      data: file.buffer,
    });
    await this.filesRepository.save(newFile);

    const newPost = this.postsRepository.create({
      message,
      file: newFile,
    });
    return this.postsRepository.save(newPost);
  }
}
