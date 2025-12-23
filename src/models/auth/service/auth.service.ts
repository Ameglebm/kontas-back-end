import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { OAuth2Client } from 'google-auth-library';
import { prisma } from '../../../lib/prisma';
import { AuthResponseDto, UserResponseDto } from '../dtos/auth-response.dto';
import { CompletarDadosRepublicaDto } from '../dtos/authDto';

//Payload usado no JWT
interface JwtPayload {
  userId: string;
  email: string;
}
//usuário injetado pelo AuthGuard via JwtStrategy
interface AuthenticatedUser {
  id: string;
  email: string;
  nome: string | null;
  fotoPerfil: string | null;
  perfilCompleto: boolean;
}

@Injectable()
export class AuthService {
  private googleClient: OAuth2Client;

  constructor(private readonly jwtService: JwtService) {
    this.googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  }
  //LOGIN COM GOOGLE
  async googleLogin(idToken: string): Promise<AuthResponseDto> {
    const ticket = await this.googleClient.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload?.email) {
      throw new UnauthorizedException('Token Google inválido');
    }

    let usuario = await prisma.usuario.findUnique({
      where: { email: payload.email },
    });

    if (!usuario) {
      usuario = await prisma.usuario.create({
        data: {
          email: payload.email,
          nome: payload.name ?? null,
          fotoPerfil: payload.picture ?? null,
        },
      });
    }

    const jwtPayload: JwtPayload = {
      userId: usuario.id,
      email: usuario.email,
    };

    const token = this.jwtService.sign(jwtPayload);

    return {
      user: this.mapToUserResponse(usuario),
      token,
    };
  }
  // COMPLETAR PERFIL DO USUÁRIO
  async completarDados(
    user: string,
    dto: CompletarDadosRepublicaDto,
  ): Promise<UserResponseDto> {
    const usuario = await prisma.usuario.update({
      where: { id: user },
      data: {
        nome: dto.nome,
        fotoPerfil: dto.fotoPerfil,
        telefone: dto.telefone,
        chavePix: dto.chavePix,
        perfilCompleto: true,
      },
    });

    return this.mapToUserResponse(usuario);
  }
  // USUÁRIO AUTENTICADO (ME)
  async getUser(userId: string): Promise<UserResponseDto> {
    const usuario = await prisma.usuario.findUnique({
      where: { id: userId },
    });

    if (!usuario) {
      throw new UnauthorizedException('Usuário não encontrado');
    }

    return this.mapToUserResponse(usuario);
  }

  // MAPEAMENTO PADRÃO DE USUÁRIO
  private mapToUserResponse(usuario: {
    id: string;
    email: string;
    nome: string | null;
    fotoPerfil: string | null;
    perfilCompleto: boolean;
  }): UserResponseDto {
    return {
      id: usuario.id,
      email: usuario.email,
      nome: usuario.nome ?? undefined,
      fotoPerfil: usuario.fotoPerfil ?? undefined,
      perfilCompleto: usuario.perfilCompleto,
    };
  }
}
