import {
    Controller,
    Post,
    Get,
    Patch,
    Delete,
    Body,
    Param,
    Req,
    UseGuards,
    Inject,
} from '@nestjs/common';
import {
    ApiTags,
    ApiBearerAuth,
    ApiOperation,
    ApiResponse,
} from '@nestjs/swagger';
import type { Request } from 'express';

import { AuthGuard } from '../../../middlewares/auth.guard';
import { MORADOR_SERVICE } from '../morador.constants';
import type { MoradorService } from '../interface/morador.service.interface';

import { CriarMoradorDto } from '../dtos/moradorDto';
import { AtualizarMoradorDto } from '../dtos/morador-updateDto';

interface AuthenticatedUser {
    id: string;
}

interface AuthenticatedRequest extends Request {
    user: AuthenticatedUser;
}

@ApiBearerAuth()
@ApiTags('Moradores')
@Controller('moradores')
@UseGuards(AuthGuard)
export class MoradorController {
    constructor(
        @Inject(MORADOR_SERVICE)
        private readonly moradorService: MoradorService,
    ) { }

    // 🔹 Criar morador (ADMIN da república)
    @ApiOperation({ summary: 'Adiciona um morador à república' })
    @ApiResponse({
        status: 201,
        description: 'Morador criado com sucesso',
        content: {
            'application/json': {
                example: {
                    id: 'uuid-morador',
                    nome: 'João',
                    email: 'joao@email.com',
                    fotoPerfil: 'link-da-foto.jpg',
                    chavePix: 'chave-pix@email.com',
                    telefone: '(24) 99999-9999',
                    role: 'USER',
                    status: 'ATIVO',
                },
            },
        },
    })
    @ApiResponse({ status: 400, description: 'Dados inválidos ou regra de negócio violada' })
    @ApiResponse({ status: 401, description: 'Não autenticado' })
    @ApiResponse({ status: 403, description: 'Sem permissão para adicionar morador' })
    @ApiResponse({ status: 404, description: 'República não encontrada' })
    @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
    @Post()
    async criar(
        @Req() req: AuthenticatedRequest,
        @Body() dto: CriarMoradorDto,
    ) {
        return this.moradorService.criar(dto);
    }

    // 🔹 Listar moradores da república
    @ApiOperation({ summary: 'Lista moradores de uma república' })
    @ApiResponse({
        status: 200,
        description: 'Moradores listados com sucesso',
        content: {
            'application/json': {
                example: [
                    {
                    id: 'uuid-morador',
                    nome: 'João',
                    email: 'joao@email.com',
                    fotoPerfil: 'link-da-foto.jpg',
                    chavePix: 'chave-pix@email.com',
                    telefone: '(24) 99999-9999',
                    role: 'USER',
                    },
                ],
            },
        },
    })
    @ApiResponse({ status: 400, description: 'ID da república inválido' })
    @ApiResponse({ status: 401, description: 'Não autenticado' })
    @ApiResponse({ status: 404, description: 'República não encontrada' })
    @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
    @Get('republica/:republicaId')
    async listarPorRepublica(
        @Param('republicaId') republicaId: string,
    ) {
        return this.moradorService.listarPorRepublica(republicaId);
    }

    // 🔹 Atualizar morador (ADMIN)
    @ApiOperation({ summary: 'Atualiza papel ou status do morador' })
    @ApiResponse({
        status: 200,
        description: 'Morador atualizado com sucesso',
        content: {
            'application/json': {
                example: {
                    id: 'uuid-morador',
                    role: 'ADMIN',
                    status: 'ATIVO',
                },
            },
        },
    })
    @ApiResponse({ status: 400, description: 'Dados inválidos' })
    @ApiResponse({ status: 401, description: 'Não autenticado' })
    @ApiResponse({ status: 403, description: 'Sem permissão para atualizar morador' })
    @ApiResponse({ status: 404, description: 'Morador não encontrado' })
    @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
    @Patch(':id')
    async atualizar(
        @Req() req: AuthenticatedRequest,
        @Param('id') moradorId: string,
        @Body() dto: AtualizarMoradorDto,
    ) {
        return this.moradorService.atualizar(
            moradorId,
            dto,
            req.user.id,
        );
    }

    // 🔹 Remover morador (ADMIN)
    @ApiOperation({ summary: 'Remove um morador da república' })
    @ApiResponse({ status: 200, description: 'Morador removido com sucesso' })
    @ApiResponse({ status: 401, description: 'Não autenticado' })
    @ApiResponse({ status: 403, description: 'Sem permissão para remover morador' })
    @ApiResponse({ status: 404, description: 'Morador não encontrado' })
    @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
    @Delete(':id')
    async remover(
        @Req() req: AuthenticatedRequest,
        @Param('id') moradorId: string,
    ): Promise<void> {
        return this.moradorService.remover(
            moradorId,
            req.user.id,
        );
    }
}
