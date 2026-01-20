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
import type { IRepublicaService } from '../interfaces/republica.service.interface';
import { AtualizarRepublicaDto, CriarRepublicaDto } from '../dtos/republicaDto';
import { AuthGuard } from '../../../middlewares/auth.guard';
import { REPUBLICA_SERVICE } from '../republica.constants';

interface AuthenticatedUser {
    id: string;
}

interface AuthenticatedRequest extends Request {
    user: {
        id: string;
    }
}

@ApiBearerAuth()
@ApiTags('Repúblicas')
@Controller('republicas')
@UseGuards(AuthGuard)
export class RepublicaController {
    constructor(
        @Inject(REPUBLICA_SERVICE)
        private readonly republicaService: IRepublicaService,
    ) { }

    // 🔹 Criar república
    @ApiOperation({ summary: 'Cria uma nova república' })
    @ApiResponse({
        status: 201, description: 'República criada com sucesso',
        content: {
            'application/json': {
                example: {
                    id: 'uuid-republica',
                    nome: 'República Exemplo',
                    imagemRepublica: 'link-da-imagem.jpg',
                }
            }
        }
    })
    @ApiResponse({ status: 400, description: 'Requisição inválida' })
    @ApiResponse({ status: 401, description: 'Não autenticado' })
    @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
    @Post()
    async criar(
        @Req() req: AuthenticatedRequest,
        @Body() dto: CriarRepublicaDto,
    ) {
        return this.republicaService.criarRepublica(
            req.user.id,
            dto.nome,
            dto.imagemRepublica,
        );
    }
    // 🔹 Buscar república por ID
    @ApiOperation({ summary: 'Busca uma república pelo ID' })
    @ApiResponse({
        status: 200, description: 'República encontrada com sucesso',
        content: {
            'application/json': {
                example: {
                    id: 'uuid-republica',
                    nome: 'República Exemplo',
                    imagemRepublica: 'link-da-imagem.jpg',
                }
            }
        }
    })
    @ApiResponse({ status: 400, description: 'Requisição inválida' })
    @ApiResponse({ status: 401, description: 'Não autenticado' })
    @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
    @Get(':id')
    async buscarPorId(
        @Param('id') id: string,
    ) {
        return this.republicaService.buscarRepublicaPorId(id);
    }
    // 🔹 Listar repúblicas do usuário
    @ApiOperation({ summary: 'Lista todas as repúblicas do usuário' })
    @ApiResponse({
        status: 200, description: 'Repúblicas listadas com sucesso',
        content: {
            'application/json': {
                example: [
                    {
                        id: 'uuid-republica',
                        nome: 'República Exemplo',
                        imagemRepublica: 'link-da-imagem.jpg',
                    }
                ]
            }
        }
    })
    @ApiResponse({ status: 400, description: 'Requisição inválida' })
    @ApiResponse({ status: 401, description: 'Não autenticado' })
    @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
    @Get()
    async listarPorUsuario(
        @Req() req: AuthenticatedRequest,
    ) {
        return this.republicaService.listarRepublicaPorUsuario(
            req.user.id,
        );
    }
    // 🔹 Atualizar república
    @ApiOperation({ summary: 'Atualiza os dados de uma república' })
    @ApiResponse({
        status: 200, description: 'República atualizada com sucesso',
        content: {
            'application/json': {
                example: {
                    id: 'uuid-republica',
                    nome: 'República Exemplo',
                    imagemRepublica: 'link-da-imagem.jpg',
                }
            }
        }
    })
    @ApiResponse({ status: 400, description: 'Requisição inválida' })
    @ApiResponse({ status: 401, description: 'Não autenticado' })
    @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
    @Patch(':id')
    async atualizar(
        @Req() req: AuthenticatedRequest,
        @Param('id') id: string,
        @Body() dto: AtualizarRepublicaDto,
    ) {
        return this.republicaService.atualizarRepublica(
            id,
            req.user.id,
            dto,
        );
    }
    // 🔹 Deletar república
    @ApiOperation({ summary: 'Deleta uma república' })
    @ApiResponse({ status: 200, description: 'República deletada com sucesso' })
    @ApiResponse({ status: 400, description: 'Requisição inválida' })
    @ApiResponse({ status: 401, description: 'Não autenticado' })
    @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
    @Delete(':id')
    async deletar(
        @Req() req: AuthenticatedRequest,
        @Param('id') id: string,
    ): Promise<void> {
        return this.republicaService.deletarRepublica(
            id,
            req.user.id,
        );
    }
}