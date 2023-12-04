import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getEnv } from './utils';

const ENV_TYPE = getEnv();

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.${ENV_TYPE}`, '.env'],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
