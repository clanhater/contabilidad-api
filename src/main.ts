import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // --- INICIO DE LA CONFIGURACIÓN DE CORS ---
  app.enableCors({
    origin: 'http://localhost:3000', // La URL de nuestro frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  // --- FIN DE LA CONFIGURACIÓN DE CORS ---

  // Usaremos el puerto 3001 para el backend para evitar conflictos con el 3000 del frontend
  await app.listen(3001); 
}
bootstrap();