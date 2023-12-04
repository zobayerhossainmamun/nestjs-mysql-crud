import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { VersioningType } from '@nestjs/common/enums';
import { getConfig } from './utils';

export const config = getConfig();
const PORT = config.PORT;
const PREFIX = config.PREFIX || '/';

async function bootstrap() {
  const logger: Logger = new Logger('main.ts');
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  // Enable application versioning
  app.enableVersioning({
    defaultVersion: '1',
    type: VersioningType.URI,
  });

  // Set global prefix for url
  app.setGlobalPrefix(PREFIX);

  await app.listen(PORT, () => {
    logger.log(`Server listenning with PORT: ${PORT}`);
  });
}
bootstrap();
