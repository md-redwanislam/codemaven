import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  const port = configService.get<number>('app.port');
  app.enableCors({
    origin: configService.getOrThrow<string[]>('cors.origin'),
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.use(cookieParser());

  await app.listen(port!);

  console.log(`Server is running at http://localhost:${port}`);
}

void bootstrap();
