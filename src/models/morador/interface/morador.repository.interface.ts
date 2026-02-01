import { Morador } from '../types/morador.type';
import { Role } from '@prisma/client';

export interface MoradorRepository {
  criar(data: {
    usuarioId: string;
    republicaId: string;
    role: Role;
  }): Promise<Morador>;

  buscarPorId(moradorId: string): Promise<Morador | null>;

  buscarPorUsuarioERepublica(
    usuarioId: string,
    republicaId: string,
  ): Promise<Morador | null>;

  listarPorRepublica(republicaId: string): Promise<Morador[]>;

  atualizar(
    usuarioId: string,
    republicaId: string,
    data: {
      role?: Role;
    },
  ): Promise<Morador>;

  remover(moradorId: string): Promise<void>;
}
