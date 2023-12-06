import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from './entities/posts.entity';
import { Repository } from 'typeorm';
import { CreateDto } from './dto';
import { ListDto } from './dto/list.dto';
import { PostVo } from './vo';
import { UpdateDto } from './dto/update.dto';

@Injectable()
export class PostsService {
    constructor(@InjectRepository(PostEntity) private readonly postRepository: Repository<PostEntity>) { }
    private LIMIT = 10;

    /**
     * Create post
     * @param {CreateDto} req 
     * @returns {string}
     */
    async createPost(req: CreateDto): Promise<string> {
        const data = new PostEntity();
        data.title = req.title;
        data.description = req.description;
        data.status = true;
        await this.postRepository.save(data);

        return 'Post created successfully.';
    }

    /**
     * Get post list with pagination
     * @param {ListDto} req 
     * @returns {PostVo[]}
     */
    async listPosts(req: ListDto): Promise<PostVo[]> {
        let offset = 0, page = 0;
        if (req.page) {
            page = Number(req.page);
            offset = (page * (this.LIMIT));
        }
        return this.postRepository.find({
            take: this.LIMIT,
            skip: offset
        });
    }

    /**
     * Get post by id
     * @param {number} id 
     * @returns {PostVo}
     */
    async postById(id: number): Promise<PostVo> {
        return this.postRepository.findOne({ where: { id: id } });
    }

    /**
     * Delete post by id
     * @param {number} id 
     * @returns {string}
     */
    async deletePostById(id: number): Promise<string> {
        await this.postRepository.delete({ id: id });
        return "Post has been deleted.";
    }

    /**
     * Update post data by id
     * @param {number} id 
     * @param {UpdateDto} req 
     * @returns {string}
     */
    async updatePostById(id: number, req: UpdateDto): Promise<string> {
        await this.postRepository.update(id, req);
        return "Post has been updated";
    }
}
