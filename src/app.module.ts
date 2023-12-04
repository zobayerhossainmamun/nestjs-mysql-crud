import { Module, Logger } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
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
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: String(configService.get('MYSQL_HOST')),
        port: Number.parseInt(configService.get('MYSQL_PORT') ?? '3306'),
        username: String(configService.get('MYSQL_USERNAME')),
        password: String(configService.get('MYSQL_PASSWORD')),
        database: String(configService.get('MYSQL_DATABASE')),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        logging: configService.get('MYSQL_LOGGING'),
        timezone: '+06:00',
        cache: {
          duration: 60000,
        },
        synchronize:true
      }),
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
