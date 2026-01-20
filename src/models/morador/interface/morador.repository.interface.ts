import { Morador } from '../types/morador.type';
import { Role } from '@prisma/client';

export interface MoradorRepository {
  criar(data: {
    moradorId: string;
    republicaId: string;
    role: Role;
  }): Promise<Morador>;

  buscarPorId(moradorId: string): Promise<Morador | null>;

  buscarPorUsuarioERepublica(
    moradorId: string,
    republicaId: string,
  ): Promise<Morador | null>;

  listarPorRepublica(republicaId: string): Promise<Morador[]>;

  atualizar(
    moradorId: string,
    id: string,
    data: {
      role?: Role;
    },
  ): Promise<Morador>;

  remover(moradorId: string): Promise<void>;
}
