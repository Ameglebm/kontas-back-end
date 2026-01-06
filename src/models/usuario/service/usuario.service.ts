import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { UsuarioRepository } from '../repository/usuario.repository';
import { AtualizarUsuarioDto } from '../dtos/usuarioDto';
import { UsuarioResponseDto } from '../dtos/usuario-response.dto';

@Injectable()
export class UsuarioService {
    constructor(
        private readonly usuarioRepository: UsuarioRepository,
    ) { }
    /**
     * 🔹 Retorna usuário autenticado
     */
    async getMe(userId: string): Promise<UsuarioResponseDto> {
        const usuario = await this.usuarioRepository.findById(userId);

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
        const usuario = await this.usuarioRepository.findById(userId);

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
    private mapToResponse(usuario: any): UsuarioResponseDto {
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
