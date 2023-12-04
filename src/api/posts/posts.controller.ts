import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateDto } from './dto';
import { PostsService } from './posts.service';
import { ListDto } from './dto/list.dto';
import { PostVo } from './vo';

@Controller('posts')
export class PostsController {
    constructor(private readonly resourcesService: PostsService) { }

    @Post('/add')
    async createPost(@Body() req: CreateDto): Promise<String> {
        return await this.resourcesService.createPost(req);
    }

    // @Get('/list')
    // async listPost(@Body() req: ListDto): Promise<PostVo>{
    //     return "";
    // }
}
