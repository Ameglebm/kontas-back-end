import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { prisma } from 'src/lib/prisma';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(configService: ConfigService) {
        const secret = configService.get<string>('JWT_SECRET');
        if (!secret) {
            throw new Error('JWT_SECRET não definido');
        }
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: secret,
        });
    }
    async validate(payload: { userId: string }) {
        const usuario = await prisma.usuario.findUnique({
            where: { id: payload.userId },
            select: {
                id: true,
                email: true,
                nome: true,
                fotoPerfil: true,
                perfilCompleto: true,
            },
        });

        if (!usuario) {
            throw new UnauthorizedException('Usuário não encontrado');
        }

        return usuario;
    }
}
