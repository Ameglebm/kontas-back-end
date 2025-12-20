import { Injectable, UnauthorizedException } from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';
import { prisma } from '../../../lib/prisma';

@Injectable()
export class GoogleStrategy {
  private client: OAuth2Client;

  constructor() {
    this.client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  }

  async validate(idToken: string) {
    const ticket = await this.client.verifyIdToken({
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
          nome: payload.name,
          fotoPerfil: payload.picture,
          verificado: true,
        },
      });
    }

    return usuario;
  }
}
