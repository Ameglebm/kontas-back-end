import { Injectable } from '@nestjs/common';
import { prisma } from 'src/lib/prisma';
import { ConviteRepository as IConviteRepository } from '../interface/convite.repository.interface';
import { StatusConvite, Role } from '@prisma/client';
import { Convite } from '@prisma/client';

@Injectable()
export class ConviteRepository implements IConviteRepository {

  async criar(data: {
    email: string;
    republicaId: string;
    status: StatusConvite;
    role: Role;
  }): Promise<Convite> {
    return prisma.convite.create({
      data,
    });
  }

  async buscarPorId(conviteId: string): Promise<Convite | null> {
    return prisma.convite.findUnique({
      where: { id: conviteId },
    });
  }

  async buscarPorUsuarioERepublica(
    email: string,
    republicaId: string,
  ): Promise<Convite | null> {
    return prisma.convite.findFirst({
      where: {
        email,
        republicaId,
      },
    });
  }

  async listarPorRepublica(republicaId: string): Promise<Convite[]> {
    return prisma.convite.findMany({
      where: { republicaId },
    });
  }

  async atualizarStatus(
    conviteId: string,
    status: StatusConvite,
  ): Promise<Convite> {
    return prisma.convite.update({
      where: { id: conviteId },
      data: { status },
    });
  }

  async remover(conviteId: string): Promise<void> {
    await prisma.convite.delete({
      where: { id: conviteId },
    });
  }
}
