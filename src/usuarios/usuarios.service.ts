import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './usuario.entity';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  // --- CORRECCIÓN AQUÍ ---
  // Cambiamos 'undefined' por 'null' para que coincida con lo que devuelve TypeORM.
  async findOneByEmail(email: string): Promise<Usuario | null> {
    return this.usuarioRepository.findOneBy({ email });
  }
}