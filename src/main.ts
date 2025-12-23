import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS (libera consumo por web e mobile)
  app.enableCors({
    origin: '*', // depois pode restringir
    methods: 'POST,GET,PUT,PATCH,DELETE,HEAD',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
  });

  // Validação global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('Kontas API')
    .setDescription('API para gerenciamento de repúblicas, moradores e contas')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT ?? 3000;
  await app.listen(port);

  console.log(`🚀 API rodando em: http://localhost:${port}`);
  console.log(`📚 Swagger em: http://localhost:${port}/api`);
  console.log(`📦 Banco de dados rodando em: http://localhost:${port}/prisma`)
}

bootstrap();
