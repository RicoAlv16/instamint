import { Test, TestingModule } from '@nestjs/testing';
import { PostsService } from './posts.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../../shared/entities/post.entity';
import { File } from '../../shared/entities/file.entity';

import { Readable } from 'stream';


describe('PostsService', () => {
  let service: PostsService;
  let postRepository: Repository<Post>;
  let fileRepository: Repository<File>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostsService,
        {
          provide: getRepositoryToken(Post),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(File),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<PostsService>(PostsService);
    postRepository = module.get<Repository<Post>>(getRepositoryToken(Post));
    fileRepository = module.get<Repository<File>>(getRepositoryToken(File));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a post', async () => {
    const mockFile = new File();
    mockFile.id = 1;
    mockFile.filename = 'test.png';
    mockFile.data = Buffer.from('test data');

    const mockPost = new Post();
    mockPost.id = 1;
    mockPost.message = 'Test message';
    mockPost.file = mockFile;

    jest.spyOn(fileRepository, 'create').mockReturnValueOnce(mockFile);
    jest.spyOn(fileRepository, 'save').mockResolvedValueOnce(mockFile);
    jest.spyOn(postRepository, 'create').mockReturnValueOnce(mockPost);
    jest.spyOn(postRepository, 'save').mockResolvedValueOnce(mockPost);

    const result = await service.createPost({ 
        fieldname: 'fieldname',
        originalname: 'test.png', 
        encoding: 'utf-8', 
        mimetype: 'image/png', 
        size: 12345,
        buffer: Buffer.from('test data'),
        stream: new Readable(),
        destination: '/path/destination',
        filename: 'test.png',
        path: '/path/to/file'
    }, 'Test message');
    
    expect(result).toEqual(mockPost);
  });
});
