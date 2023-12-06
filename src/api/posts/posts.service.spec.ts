import { Test, TestingModule } from '@nestjs/testing';
import { PostsService } from './posts.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PostEntity } from './entities/posts.entity';
import { PostVo } from './vo';
import { Repository } from 'typeorm';
import { CreateDto } from './dto';

describe('PostsService', () => {
  let postService: PostsService;
  let model: Repository<PostEntity>;

  const mockPost: PostVo = {
    id: 1,
    title: "My Test Post",
    description: 'Post Description',
    status: true,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  const mockPostService = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn()
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostsService,
        {
          provide: getRepositoryToken(PostEntity),
          useValue: mockPostService
        }
      ]
    }).compile();
    postService = module.get<PostsService>(PostsService);
    model = module.get<Repository<PostEntity>>(getRepositoryToken(PostEntity));
  });

  it('should be defined', () => {
    expect(postService).toBeDefined();
  });

  it('should return found post', async () => {
    const findOneSpy = jest.spyOn(model, 'findOne').mockResolvedValue(mockPost);
    const foundPost = await postService.postById(1);

    expect(foundPost).toEqual(mockPost);
    expect(findOneSpy).toHaveBeenCalledWith({ where: { id: 1 } });
  });

  it('should create post', async () => {
    const createBody: CreateDto = {
      title: "Test From Server",
      description: " This is description server"
    }

    let spySave = jest.spyOn(model, 'save');
    const result = await postService.createPost(createBody);

    expect(spySave).toHaveBeenCalled();
    expect(result).toEqual("Post created successfully.");
  });

});
