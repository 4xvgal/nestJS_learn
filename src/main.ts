import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // if there is a non-whitelisted property, it will be removed
      forbidNonWhitelisted: true, // if there is a non-whitelisted property, it will be removed
      transform: true, //클라이언트가 보낸것을 서버가 원하는 실제 타입으로 변환해줌
    })
  );
  await app.listen(3000);
}
bootstrap();
