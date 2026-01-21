import { Injectable } from '@nestjs/common';
import { Morador, Role } from '@prisma/client';
import { MoradorRepository as IMoradorRepository } from '../interface/morador.repository.interface';
import { prisma } from 'src/lib/prisma';


@Injectable()
export class MoradorRepository implements IMoradorRepository {

  async criar(data: {
    usuarioId: string;
    republicaId: string;
    role: Role;
  }): Promise<Morador> {
    return prisma.morador.create({
      data: {
        usuarioId: data.usuarioId,
        republicaId: data.republicaId,
        role: data.role,
      },
    });
  }

  async buscarPorId(id: string): Promise<Morador | null> {
    return prisma.morador.findUnique({
      where: { id },
    });
  }

  async buscarPorUsuarioERepublica(
    usuarioId: string,
    republicaId: string,
  ): Promise<Morador | null> {
    return prisma.morador.findFirst({
      where: {
        usuarioId,
        republicaId,
      },
    });
  }

  async listarPorRepublica(republicaId: string): Promise<Morador[]> {
    return prisma.morador.findMany({
      where: {
        republicaId,
      },
      include: {
        usuario: {
          select: {
            id: true,
            nome: true,
            email: true,
            fotoPerfil: true,
            telefone: true,
            chavePix: true,

          }
        }
      }
    });
  }

  async atualizar(
    usuarioId: string,
    republicaId: string,
    data: { role?: Role },
  ): Promise<Morador> {
    return prisma.morador.update({
      where: {
        usuarioId_republicaId: {
          usuarioId,
          republicaId,
        },
      },
      data,
    });
  }

  async remover(id: string): Promise<void> {
    await prisma.morador.delete({
      where: { id },
    });
  }
}
