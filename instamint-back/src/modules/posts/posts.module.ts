import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { Post } from '../../shared/entities/post.entity';
import { File } from '../../shared/entities/file.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Post, File])],
  providers: [PostsService],
  controllers: [PostsController],
})
export class PostModule {}
