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
import { CONTA_SERVICE } from '../contas.constants';
import type { ContaService } from '../interface/contas.service.interface';
import { CriarContaDto } from '../graphql/inputs/create-conta.type';
import { AtualizarContaDto } from '../graphql/inputs/update-conta.input';

interface AuthenticatedUser {
    id: string;
}
interface AuthenticatedRequest extends Request {
    user: AuthenticatedUser;
}

@ApiBearerAuth()
@ApiTags('Contas')
@Controller('contas')
@UseGuards(AuthGuard)
export class ContaController {
    constructor(
        @Inject(CONTA_SERVICE)
        private readonly contaService: ContaService,
    ) {}

    // 🔹 Criar conta (ADMIN da república)
    @ApiOperation({ summary: 'Cria uma conta para uma república' })
    @ApiResponse({
        status: 201,
        description: 'Conta criada com sucesso',
        content: {
            'application/json': {
                example: {
                    id: 'uuid-conta',
                    descricao: 'Conta de água',
                    valor: 100,
                    vencimento: '2026-01-31T00:00:00.000Z',
                    status: 'PENDENTE',
                    republicaId: 'uuid-republica',
                    criadoEm: '2026-01-01T10:00:00.000Z',
                    atualizadoEm: '2026-01-01T10:00:00.000Z',
                },
            },
        },
    })
    @ApiResponse({ status: 400, description: 'Dados inválidos' })
    @ApiResponse({ status: 401, description: 'Não autenticado' })
    @ApiResponse({ status: 403, description: 'Apenas ADMIN pode criar contas' })
    @ApiResponse({ status: 404, description: 'República não encontrada' })
    @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
    @Post()
    async criar(
        @Req() req: AuthenticatedRequest,
        @Body() dto: CriarContaDto,
    ) {
        return this.contaService.criar(dto, req.user.id);
    }

    // 🔹 Listar contas da república
    @ApiOperation({ summary: 'Lista contas de uma república' })
    @ApiResponse({
        status: 200,
        description: 'Contas listadas com sucesso',
        content: {
            'application/json': {
                example: [
                    {
                        id: 'uuid-conta',
                        descricao: 'Conta de luz',
                        valor: 150,
                        vencimento: '2026-01-15T00:00:00.000Z',
                        status: 'PENDENTE',
                        republicaId: 'uuid-republica',
                        criadoEm: '2026-01-01T10:00:00.000Z',
                        atualizadoEm: '2026-01-01T10:00:00.000Z',
                    },
                ],
            },
        },
    })
    @ApiResponse({ status: 400, description: 'ID da república inválido' })
    @ApiResponse({ status: 401, description: 'Não autenticado' })
    @ApiResponse({ status: 403, description: 'Sem permissão para listar contas' })
    @ApiResponse({ status: 404, description: 'República não encontrada' })
    @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
    @Get('republica/:republicaId')
    async listarPorRepublica(
        @Param('republicaId') republicaId: string,
    ) {
        return this.contaService.listarPorRepublica(republicaId);
    }

    // 🔹 Atualizar status da conta (ADMIN da república)
    @ApiOperation({ summary: 'Atualiza o status de uma conta' })
    @ApiResponse({
        status: 200,
        description: 'Status da conta atualizado com sucesso',
        content: {
            'application/json': {
                example: {
                    id: 'uuid-conta',
                    status: 'PAGO',
                },
            },
        },
    })
    @ApiResponse({ status: 400, description: 'Status inválido' })
    @ApiResponse({ status: 401, description: 'Não autenticado' })
    @ApiResponse({ status: 403, description: 'Apenas ADMIN pode alterar conta' })
    @ApiResponse({ status: 404, description: 'Conta não encontrada' })
    @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
    @Patch(':id/status')
    async atualizarStatus(
        @Req() req: AuthenticatedRequest,
        @Param('id') contaId: string,
        @Body() dto: AtualizarContaDto,
    ) {
        return this.contaService.atualizarStatus(contaId, dto, req.user.id);
    }

    // 🔹 Remover conta (ADMIN da república)
    @ApiOperation({ summary: 'Remove uma conta' })
    @ApiResponse({ status: 204, description: 'Conta removida com sucesso' })
    @ApiResponse({ status: 401, description: 'Não autenticado' })
    @ApiResponse({ status: 403, description: 'Apenas ADMIN pode remover conta' })
    @ApiResponse({ status: 404, description: 'Conta não encontrada' })
    @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
    @Delete(':id')
    async remover(
        @Req() req: AuthenticatedRequest,
        @Param('id') contaId: string,
    ) {
        return this.contaService.remover(contaId, req.user.id);
    }
}
