import {
    Controller,
    Get,
    Patch,
    Body,
    Req,
    UseGuards,
} from '@nestjs/common';
import {
    ApiTags,
    ApiBearerAuth,
    ApiOperation,
    ApiResponse,
} from '@nestjs/swagger';
import type { Request } from 'express';
import { UsuarioService } from '../service/usuario.service';
import { AtualizarUsuarioDto } from '../dtos/usuarioDto';
import { AuthGuard } from '../../../middlewares/auth.guard';

interface AuthenticatedUser {
    id: string;
    nome: string;
    email: string;
    fotoPerfil?: string;
    perfilCompleto: boolean;
    chavePix?: string;
    telefone?: string;
}

interface AuthenticatedRequest extends Request {
    user: AuthenticatedUser;
}

@ApiTags('Usuário')
@Controller('usuarios')
export class UsuarioController {
    constructor(
        private readonly usuarioService: UsuarioService,
    ) { }
    // 🔹 RETORNA USUÁRIO AUTENTICADO
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Retorna o usuário autenticado' })
    @ApiResponse({
        status: 200,
        description: 'Usuário retornado com sucesso',
        content: {
            'application/json': {
                example: {
                    id: 'uuid-usuario',
                    email: 'joao@email.com',
                    nome: 'João da Silva',
                    fotoPerfil: 'link-da-foto.jpg',
                    perfilCompleto: true,
                    chavePix: 'chave-pix@email.com',
                    telefone: '(24) 99999-9999',
                },
            },
        },
    })
    @ApiResponse({ status: 401, description: 'Não autenticado' })
    @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
    @UseGuards(AuthGuard)
    @Get('me')
    async getMe(
        @Req() req: AuthenticatedRequest,
    ) {
        return this.usuarioService.getMe(req.user.id);
    }
    // 🔹 ATUALIZAR PERFIL DO USUÁRIO (PÓS-ONBOARDING)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Atualizar dados do perfil do usuário' })
    @ApiResponse({
        status: 200,
        description: 'Perfil atualizado com sucesso',
        content: {
            'application/json': {
                example: {
                    id: 'uuid-usuario',
                    email: 'joao@email.com',
                    nome: 'João da Silva',
                    fotoPerfil: 'link-da-foto.jpg',
                    chavePix: 'chave-pix@email.com',
                    telefone: '(24) 99999-9999',
                    perfilCompleto: true,
                },
            },
        },
    })
    @ApiResponse({ status: 400, description: 'Requisição inválida' })
    @ApiResponse({ status: 401, description: 'Não autenticado' })
    @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
    @UseGuards(AuthGuard)
    @Patch('atualizar-perfil')
    async atualizarPerfil(
        @Req() req: AuthenticatedRequest,
        @Body() dto: AtualizarUsuarioDto,
    ) {
        return this.usuarioService.atualizarPerfil(
            req.user.id,
            dto,
        );
    }
}
