import { Usuario } from '../types/usuario.type';

export interface IAuthRepository {
  findByEmail(email: string): Promise<Usuario | null>;
  findById(id: string): Promise<Usuario | null>;
  createUser(data: {
    email: string;
    nome?: string | null;
    fotoPerfil?: string | null;
  }): Promise<Usuario>;
  completarPerfil(
    userId: string,
    data: {
      nome: string;
      telefone: string;
      chavePix: string;
      fotoPerfil?: string;
    }
  ): Promise<Usuario>;
}
