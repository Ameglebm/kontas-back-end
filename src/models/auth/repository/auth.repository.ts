import { Injectable } from '@nestjs/common';
import { Usuario } from '@prisma/client';
import { prisma } from '../../../lib/prisma';
import { IAuthRepository } from '../interfaces/auth.repository.interface';

@Injectable()
export class AuthRepository implements IAuthRepository {

    async findByEmail(email: string): Promise<Usuario | null> {
        return prisma.usuario.findUnique({
            where: { email },
        });
    }

    async findById(id: string): Promise<Usuario | null> {
        return prisma.usuario.findUnique({
            where: { id },
        });
    }

    async createUser(data: {
        email: string;
        nome?: string | null;
        fotoPerfil?: string | null;
    }): Promise<Usuario> {
        return prisma.usuario.create({
            data: {
                email: data.email,
                nome: data.nome ?? null,
                fotoPerfil: data.fotoPerfil ?? null,
                perfilCompleto: false, // estado inicial
            },
        });
    }

    async completarPerfil(
        userId: string,
        data: {
            nome: string;
            telefone: string;
            chavePix: string;
            fotoPerfil?: string;
        }
    ): Promise<Usuario> {
        return prisma.usuario.update({
            where: { id: userId },
            data: {
                nome: data.nome,
                telefone: data.telefone,
                chavePix: data.chavePix,
                fotoPerfil: data.fotoPerfil ?? null,
                perfilCompleto: true, // muda o estado
            },
        });
    }
}
