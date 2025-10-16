import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

// import { existsSync, mkdirSync } from 'fs';
import * as express from 'express';


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // habilitando CORS
  app.enableCors();

  // class-validator
  app.useGlobalPipes(new ValidationPipe({
    disableErrorMessages: false,
    whitelist: true,
    forbidNonWhitelisted: true
  }));

  // Swagger
  const config = new DocumentBuilder()
  .addBearerAuth()
  .setTitle('Backend Api LISTO')
  .setDescription('Proyecto Backend api rest')
  .setVersion('1.0')
  .addTag('node')
  .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory);
  // end Swagger

  /*
  const uploadDir = join(process.cwd(), 'uploads');
  if (!existsSync(uploadDir)) {
    mkdirSync(uploadDir);
  }
    */

  app.use('/uploads', express.static(join(process.cwd(), 'uploads'))); 
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
