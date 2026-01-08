/**
 * 🔹Contrato da regra de negócio
Define o que o sistema pode fazer com usuário, não como.
 */
import { Usuario } from '../types/usuario.type';
import {
    AtualizarUsuarioDto,
    EntrarRepublicaDto,
    AceitarConviteDto,
    SairRepublicaDto,
    DeletarUsuarioDto,
} from '../dtos/usuarioDto';

export interface IUsuarioService {
    /**
     * 🔹 Obter dados do usuário logado
     */
    obterPerfil(usuarioId: string): Promise<Usuario>;
    /**
     * 🔹 Atualizar perfil do usuário (pós-onboarding)
     */
    atualizarPerfil(
        usuarioId: string,
        data: AtualizarUsuarioDto,
    ): Promise<Usuario>;
    /**
     * 🔹 Entrar em uma república (código ou vínculo direto)
     */
    entrarRepublica(
        usuarioId: string,
        data: EntrarRepublicaDto,
    ): Promise<void>;
    /**
     * 🔹 Aceitar convite para república
     */
    aceitarConvite(
        usuarioId: string,
        data: AceitarConviteDto,
    ): Promise<void>;
    /**
     * 🔹 Sair da república atual (remover vínculo)
     */
    sairRepublica(
        usuarioId: string,
        data: SairRepublicaDto,
    ): Promise<void>;
    /**
     * 🔹 Deletar conta do usuário (soft delete)
     */
    deletarUsuario(
        usuarioId: string,
        data: DeletarUsuarioDto,
    ): Promise<void>;
}