import { Injectable } from '@nestjs/common';
import { Morador, Role } from '@prisma/client';
import { MoradorRepository as IMoradorRepository } from '../interface/morador.repository.interface';
import { prisma } from 'src/lib/prisma';


@Injectable()
export class MoradorRepository implements IMoradorRepository {

  async criar(data: {
    moradorId: string;
    republicaId: string;
    role: Role;
  }): Promise<Morador> {
    return prisma.morador.create({
      data: {
        moradorId: data.moradorId,
        republicaId: data.republicaId,
        role: data.role,
      },
    });
  }

  async buscarPorId(moradorId: string): Promise<Morador | null> {
    return prisma.morador.findUnique({
      where: { id: moradorId },
    });
  }

  async buscarPorUsuarioERepublica(
    moradorId: string,
    republicaId: string,
  ): Promise<Morador | null> {
    return prisma.morador.findFirst({
      where: {
        moradorId,
        republicaId,
      },
    });
  }

  async listarPorRepublica(republicaId: string): Promise<Morador[]> {
    return prisma.morador.findMany({
      where: {
        republicaId,
      },
    });
  }

  async atualizar(
    moradorId: string,
    republicaId: string,
    data: { role?: Role },
  ): Promise<Morador> {
    return prisma.morador.update({
      where: {
        moradorId_republicaId: {
          moradorId,
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
