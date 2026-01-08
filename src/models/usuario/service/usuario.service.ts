import { Injectable, NotFoundException, BadRequestException, Inject } from '@nestjs/common';
import { AtualizarUsuarioDto } from '../dtos/usuarioDto';
import { UsuarioResponseDto } from '../dtos/usuario-response.dto';
import { Usuario } from '../types/usuario.type';
import type { IUsuarioRepository } from '../interfaces/usuario.repository.interface';
import { USUARIO_REPOSITORY } from '../usuario.constants';

@Injectable()
export class UsuarioService {
    constructor(
        @Inject(USUARIO_REPOSITORY)
        private readonly usuarioRepository: IUsuarioRepository,
    ) { }
    /**
     * 🔹 Retorna usuário autenticado
     */
    async getMe(userId: string): Promise<UsuarioResponseDto> {
        const usuario = await this.usuarioRepository.buscarPorId(userId);

        if (!usuario) {
            throw new NotFoundException('Usuário não encontrado');
        }

        return this.mapToResponse(usuario);
    }
    /**
     * 🔹 Atualizar perfil (pós-onboarding)
     */
    async atualizarPerfil(
        userId: string,
        dto: AtualizarUsuarioDto,
    ): Promise<UsuarioResponseDto> {
        const usuario = await this.usuarioRepository.buscarPorId(userId);

        if (!usuario) {
            throw new NotFoundException('Usuário não encontrado');
        }

        if (!usuario.perfilCompleto) {
            throw new BadRequestException(
                'Complete o onboarding antes de atualizar o perfil',
            );
        }

        const atualizado = await this.usuarioRepository.atualizarPerfil(
            userId,
            dto,
        );

        return this.mapToResponse(atualizado);
    }
    /**
     * 🔹 Mapper central do usuário
     */
    private mapToResponse(usuario: Usuario): UsuarioResponseDto {
        return {
            id: usuario.id,
            email: usuario.email,
            nome: usuario.nome ?? undefined,
            fotoPerfil: usuario.fotoPerfil ?? undefined,
            chavePix: usuario.chavePix ?? undefined,
            telefone: usuario.telefone ?? undefined,
            perfilCompleto: usuario.perfilCompleto,
        };
    }
}
