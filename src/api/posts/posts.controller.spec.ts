import { Test, TestingModule } from '@nestjs/testing';
import { PostsController } from './posts.controller';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { PostEntity } from './entities/posts.entity';
import { PostsService } from './posts.service';

describe('PostsController', () => {
  let controller: PostsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostsController],
      providers: [
        PostsService,
        {
          provide: getRepositoryToken(PostEntity),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn()
          }
        }
      ]
    }).compile();

    controller = module.get<PostsController>(PostsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
