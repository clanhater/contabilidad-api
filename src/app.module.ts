import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsuariosModule } from './usuarios/usuarios.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',

        // SOLUCIÓN: Usamos el operador '||' para dar un valor por defecto si la variable no existe.
        // Esto asegura que nunca pasemos 'undefined' a la configuración de TypeORM.
        host: configService.get<string>('DB_HOST') || 'localhost',
        
        // SOLUCIÓN PARA EL PUERTO:
        // 1. Damos un valor por defecto ('3306').
        // 2. Añadimos el '10' a parseInt, que es una buena práctica para asegurar que se parsea en base decimal.
        port: parseInt(configService.get<string>('DB_PORT') || '3306', 10),
        
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
    }),

    AuthModule,

    UsuariosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}