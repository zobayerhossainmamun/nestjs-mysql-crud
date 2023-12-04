import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from './entities/posts.entity';
import { Repository } from 'typeorm';
import { CreateDto } from './dto';

@Injectable()
export class PostsService {
    constructor(@InjectRepository(PostEntity) private readonly postRepository: Repository<PostEntity>) { }

    async createPost(req: CreateDto): Promise<String> {
        const data = this.postRepository.create({ ...req });
        await this.postRepository.save(data);
        return 'Post created successfully.';
    }
}
