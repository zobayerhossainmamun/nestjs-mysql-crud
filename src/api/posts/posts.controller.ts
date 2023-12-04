import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CreateDto } from './dto';
import { PostsService } from './posts.service';
import { ListDto } from './dto/list.dto';
import { PostVo } from './vo';
import { UpdateDto } from './dto/update.dto';

@Controller('posts')
export class PostsController {
    constructor(private readonly postService: PostsService) { }

    @Post('/add')
    async createPost(@Body() req: CreateDto): Promise<string> {
        return await this.postService.createPost(req);
    }

    @Get('/list')
    async listPost(@Body() req: ListDto): Promise<PostVo[]> {
        return await this.postService.listPosts(req);
    }

    @Get('/:id')
    async postById(@Param('id', new ParseIntPipe()) id: number): Promise<PostVo> {
        return await this.postService.postById(id);
    }

    @Post('/delete/:id')
    async deletePostById(@Param('id', new ParseIntPipe()) id: number): Promise<string> {
        await this.postService.deletePostById(id);
        return "Post has been deleted.";
    }

    @Post('/update/:id')
    async updatePostById(@Body() req: UpdateDto, @Param('id', new ParseIntPipe()) id: number): Promise<string> {
        return this.postService.updatePostById(id, req);
    }
}
