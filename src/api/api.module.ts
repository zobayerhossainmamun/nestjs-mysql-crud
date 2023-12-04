import { Module } from '@nestjs/common';
import { PostsController } from './posts/posts.controller';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [PostsModule],
  controllers: [PostsController],
})

export class ApiModule {}