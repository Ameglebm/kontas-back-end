import {
    Controller,
    Post,
    Get,
    Patch,
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
import { CONVITE_SERVICE } from '../convite.constants';
import type { ConviteService } from '../interface/convite.service.interface';
import { CriarConviteDto } from '../dtos/conviteDto';
import { AtualizarConviteDto } from '../dtos/convite-update.dto';

interface AuthenticatedUser {
    email: string;
    id: string;
}
interface AuthenticatedRequest extends Request {
    user: AuthenticatedUser;
}

@ApiBearerAuth()
@ApiTags('Convites')
@Controller('convites')
@UseGuards(AuthGuard)
export class ConviteController {
    constructor(
        @Inject(CONVITE_SERVICE)
        private readonly conviteService: ConviteService,
    ) { }

    // 🔹 Criar convite (ADMIN da república)
    @ApiOperation({ summary: 'Cria um convite para uma república' })
    @ApiResponse({
        status: 201,
        description: 'Convite criado com sucesso',
        content: {
            'application/json': {
                example: {
                    id: 'uuid-convite',
                    usuarioId: 'uuid-usuario',
                    republicaId: 'uuid-republica',
                    status: 'PENDENTE',
                    criadoEm: '2025-01-01T10:00:00.000Z',
                    atualizadoEm: '2025-01-01T10:00:00.000Z',
                },
            },
        },
    })
    @ApiResponse({ status: 400, description: 'Dados inválidos' })
    @ApiResponse({ status: 401, description: 'Não autenticado' })
    @ApiResponse({ status: 403, description: 'Apenas ADMIN pode criar convites' })
    @ApiResponse({ status: 404, description: 'República não encontrada' })
    @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
    @Post()
    async criar(
        @Req() req: AuthenticatedRequest,
        @Body() dto: CriarConviteDto,
    ) {
        return this.conviteService.criar(
            dto,
            req.user.id,
        );
    }

    // 🔹 Listar convites da república
    @ApiOperation({ summary: 'Lista convites de uma república' })
    @ApiResponse({
        status: 200,
        description: 'Convites listados com sucesso',
        content: {
            'application/json': {
                example: [
                    {
                        id: 'uuid-convite',
                        usuarioId: 'uuid-usuario',
                        status: 'PENDENTE',
                    },
                ],
            },
        },
    })
    @ApiResponse({ status: 400, description: 'ID da república inválido' })
    @ApiResponse({ status: 401, description: 'Não autenticado' })
    @ApiResponse({ status: 403, description: 'Sem permissão para listar convites' })
    @ApiResponse({ status: 404, description: 'República não encontrada' })
    @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
    @Get('republica/:republicaId')
    async listarPorRepublica(
        @Param('republicaId') republicaId: string,
    ) {
        return this.conviteService.listarPorRepublica(republicaId);
    }

    // 🔹 Aceitar ou recusar convite (usuário convidado)
    @ApiOperation({ summary: 'Aceita ou recusa um convite' })
    @ApiResponse({
        status: 200,
        description: 'Status do convite atualizado com sucesso',
        content: {
            'application/json': {
                example: {
                    id: 'uuid-convite',
                    status: 'ACEITO',
                },
            },
        },
    })
    @ApiResponse({ status: 400, description: 'Status inválido' })
    @ApiResponse({ status: 401, description: 'Não autenticado' })
    @ApiResponse({ status: 403, description: 'Você não pode alterar este convite' })
    @ApiResponse({ status: 404, description: 'Convite não encontrado' })
    @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
    @Patch(':id')
    async atualizarStatus(
        @Req() req: AuthenticatedRequest,
        @Param('id') conviteId: string,
        @Body() dto: AtualizarConviteDto,
    ) {
        return this.conviteService.atualizarStatus(
            conviteId,
            dto,
            req.user.email,
            req.user.id,
        );
    }

    // 🔹 Listar convites do morador USER
    @ApiOperation({ summary: 'Lista os convites do usuário logado' })
    @ApiResponse({
        status: 200,
        description: 'Convites listados com sucesso',
        content: {
            'application/json': {
                example: [
                    {
                        id: 'uuid-convite',
                        email: 'usuario@email.com',
                        republicaId: 'uuid-republica',
                        status: 'PENDENTE',
                        criadoEm: '2025-01-01T10:00:00.000Z',
                        atualizadoEm: '2025-01-01T10:00:00.000Z',
                    },
                ],
            },
        },
    })
    @ApiResponse({ status: 401, description: 'Não autenticado' })
    @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
    @Get('listarPorEmail/:usuarioId')
    async listarMeusConvites(
        @Req() req: AuthenticatedRequest,
        @Param('usuarioId') usuarioId: string,
    ) {
        return this.conviteService.listarPorUsuario(
            req.user.email,
        );
    }
}   
