import * as dotenv from 'dotenv';
dotenv.config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Activez CORS pour toutes les routes et origines
  app.enableCors();
  
  // Ou pour une configuration plus spécifique :
  app.enableCors({
    origin: ['http://localhost:4200', 'http://localhost:55535'], // ou un tableau d'origines valides
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept',
  });

  await app.listen(3000);
}
bootstrap();
