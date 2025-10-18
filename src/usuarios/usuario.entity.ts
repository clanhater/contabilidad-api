import { Entity, PrimaryColumn, Column, BeforeInsert } from 'typeorm';
import { randomUUID } from 'crypto';

@Entity({ name: 'usuarios' }) // Mapea esta clase a la tabla 'usuarios'
export class Usuario {
  @PrimaryColumn({ type: 'varchar', length: 36 })
  id: string;

  @Column({ type: 'varchar', length: 255 })
  nombre_completo: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @Column({ name: 'role_id', nullable: true })
  roleId: number;

  // Genera un UUID automáticamente antes de insertar un nuevo usuario
  @BeforeInsert()
  generateId() {
    this.id = randomUUID();
  }
}