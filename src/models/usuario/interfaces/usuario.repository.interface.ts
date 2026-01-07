/**
 * 🔹Contrato de acesso a dados (Prisma / Banco)
Responsável por buscar, criar, atualizar usuário no banco.
 */
import { Usuario } from '../types/usuario.type';
import {
  CriarUsuarioData,
  AtualizarUsuarioData,
} from '../types/usuario.type';

export interface IUsuarioRepository {
  criar(data: CriarUsuarioData): Promise<Usuario>;
  buscarPorId(id: string): Promise<Usuario | null>;
  buscarPorEmail(email: string): Promise<Usuario | null>;
  atualizarPerfil(id: string, data: AtualizarUsuarioData): Promise<Usuario>;
}

