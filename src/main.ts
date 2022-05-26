import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  console.log(join(__dirname, '..', 'front'));
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
  }));
  app.setGlobalPrefix('/api/');
  app.enableCors();
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
