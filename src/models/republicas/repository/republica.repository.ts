import { Injectable } from '@nestjs/common';
import { Republica } from '@prisma/client';
import { IRepublicaRepository, } from '../interfaces/republica.repository.interface';
import { prisma } from 'src/lib/prisma';

@Injectable()
export class RepublicaRepository implements IRepublicaRepository {

    async criarRepublica(data: {
        usuarioId: string;
        nome: string;
        imagemRepublica?: string;
    }): Promise<Republica> {
        return prisma.republica.create({
            data: {
                nome: data.nome,
                imagemRepublica: data.imagemRepublica ?? null,
                moradores: {
                    create: {
                        moradorId: data.usuarioId,
                        role: 'ADMIN', // ou DONO
                    },
                },
            },
        });
    }

    async buscarPorId(id: string): Promise<Republica | null> {
        return prisma.republica.findUnique({
            where: { id },
        });
    }

    async listarPorUsuario(usuarioId: string): Promise<Republica[]> {
        return prisma.republica.findMany({
            where: {
                moradores: {
                    some: {
                        moradorId: usuarioId,
                    },
                },
            },
        });
    }

    async atualizarRepublica(
        id: string,
        data: {
            nome?: string;
            imagemRepublica?: string;
        },
    ): Promise<Republica> {
        return prisma.republica.update({
            where: { id },
            data: {
                ...(data.nome !== undefined && { nome: data.nome }),
                ...(data.imagemRepublica !== undefined && {
                    imagemRepublica: data.imagemRepublica,
                }),
            },
        });
    }

    async deletar(id: string): Promise<void> {
        await prisma.republica.delete({
            where: { id },
        });
    }
}
