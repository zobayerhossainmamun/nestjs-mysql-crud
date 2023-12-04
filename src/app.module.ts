import { Module, Logger } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { getEnv } from './utils';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { ApiModule } from './api/api.module';

const ENV_TYPE = getEnv();

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.${ENV_TYPE}`, '.env'],
    }),
    ApiModule
  ],
  controllers: [],
  providers: [
    Logger,
    // Use HttpExceptionFilter Globally
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule { }
