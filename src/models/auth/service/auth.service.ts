import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { prisma } from '../../../lib/prisma';
import { OAuth2Client } from 'google-auth-library';
import { AuthResponseDto, UserResponseDto } from '../dtos/auth-response.dto';
import { CompletarDadosRepublicaDto } from '../dtos/authDto';

@Injectable()
export class AuthService {
  private googleClient: OAuth2Client;

  constructor(private readonly jwtService: JwtService) {
    this.googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  }

  /**
   * Login com Google
   */
  async googleLogin(idToken: string): Promise<AuthResponseDto> {
    const ticket = await this.googleClient.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload?.email) {
      throw new UnauthorizedException('Token Google inválido');
    }

    // Procura ou cria usuário
    let usuario = await prisma.usuario.findUnique({
      where: { email: payload.email },
    });

    if (!usuario) {
      usuario = await prisma.usuario.create({
        data: {
          email: payload.email,
          nome: payload.name || 'Sem nome',
          fotoPerfil: payload.picture,
          verificado: true,
        },
      });
    }

    // Gera JWT
    const token = this.jwtService.sign({
      userId: usuario.id,
      email: usuario.email,
    });

    return {
      user: this.mapToUserResponse(usuario),
      token,
    };
  }

  /**
   * Completa dados da república
   */
  async completarDados(user: any, dto: CompletarDadosRepublicaDto): Promise<UserResponseDto> {
    const usuario = await prisma.usuario.update({
      where: { id: user.userId },
      data: {
        nome: dto.nome,
        chavePix: dto.chavePix,
        fotoPerfil: dto.fotoPerfil || user.fotoPerfil,
      },
    });

    return this.mapToUserResponse(usuario);
  }

  /**
   * Retorna usuário autenticado
   */
  async getUser(userId: string) {
    const usuario = await prisma.usuario.findUnique({ where: { id: userId } });
    if (!usuario) throw new UnauthorizedException('Usuário não encontrado');
    return this.mapToUserResponse(usuario);
  }

  /**
   * Mapeia dados para o DTO de resposta
   */
  private mapToUserResponse(usuario: any): UserResponseDto {
    return {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      fotoPerfil: usuario.fotoPerfil,
      role: usuario.role,
    };
  }
}
