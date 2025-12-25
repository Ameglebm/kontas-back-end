import { Controller, Post, Get, Body, Req, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import type { Request } from 'express';
import { GoogleAuthDto, CompletarDadosRepublicaDto } from '../dtos/authDto';
import { AuthService } from '../service/auth.service';
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

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }
  // LOGIN COM GOOGLE (MOBILE)
  // Recebe idToken do Google e retorna JWT da aplicação
  @ApiOperation({ summary: 'Login com Google (Mobile)' })
  @ApiResponse({
    status: 200,
    description: 'Usuário logado com sucesso.',
    content: {
      'application/json': {
        example: {
          user: {
            id: 'uuid-usuario',
            nome: 'João da Silva',
            email: 'joao@email.com',
            fotoPerfil: 'link-da-foto.jpg',
          },
          token: 'jwt.token.aqui',
        },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Requisição inválida' })
  @ApiResponse({ status: 401, description: 'Não autenticado' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
  @Post('google')
  async googleAuth(@Body() dto: GoogleAuthDto) {
    return this.authService.googleLogin(dto.token);
  }
  //COMPLETAR DADOS OBRIGATÓRIOS APÓS LOGIN
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Completar dados após login' })
  @ApiResponse({
    status: 200,
    description: 'Dados completados com sucesso',
    content: {
      'application/json': {
        example: {
          id: 'uuid-usuario',
          nome: 'João da Silva',
          email: 'joao@email.com',
          telefone: '(24) 99999-9999',
          chavePix: 'chave-pix@email.com',
          fotoPerfil: 'link-da-foto.jpg',
        },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Requisição inválida' })
  @ApiResponse({ status: 401, description: 'Não autenticado' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
  @UseGuards(AuthGuard)
  @Post('completar-dados')
  async completarDados(
    @Req() req: AuthenticatedRequest,
    @Body() dto: CompletarDadosRepublicaDto,
  ) {
    return this.authService.completarDados(req.user.id, dto);
  }
  //RETORNA USUÁRIO AUTENTICADO (JWT)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Retorna o usuário autenticado' })
  @ApiResponse({
    status: 200,
    description: 'Usuário autenticado retornado com sucesso',
    content: {
      'application/json': {
        example: {
          id: 'uuid-usuario',
          nome: 'João da Silva',
          email: 'joao@email.com',
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
  async me(@Req() req: AuthenticatedRequest) {
    return req.user;
  }
}
