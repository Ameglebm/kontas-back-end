import { Usuario } from '@prisma/client';

export interface UsuarioRepository {
    criar(data: CriarUsuarioData): Promise<Usuario>;
    buscarPorId(id: string): Promise<Usuario | null>;
    buscarPorEmail(email: string): Promise<Usuario | null>;
    atualizar(id: string, data: AtualizarUsuarioData): Promise<Usuario>;
}
