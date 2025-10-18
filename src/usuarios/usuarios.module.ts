import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosService } from './usuarios.service';
import { Usuario } from './usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario])], // Importante
  providers: [UsuariosService],
  exports: [UsuariosService], // Importante para que Auth pueda usarlo
})
export class UsuariosModule {}