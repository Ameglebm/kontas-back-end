import { Injectable } from '@nestjs/common';
import { IUsuarioRepository } from '../interfaces/usuario.repository.interface';
import { prisma } from '../../../lib/prisma';
import {
  CriarUsuarioData,
  AtualizarUsuarioData,
  Usuario,
} from '../types/usuario.type';

@Injectable()
export class PrismaUsuarioRepository implements IUsuarioRepository {
  async criar(data: CriarUsuarioData): Promise<Usuario> {
    return prisma.usuario.create({ data });
  }

  async buscarPorId(id: string): Promise<Usuario | null> {
    return prisma.usuario.findUnique({
      where: { id },
    });
  }

  async buscarPorEmail(email: string): Promise<Usuario | null> {
    return prisma.usuario.findUnique({
      where: { email },
    });
  }

  async atualizarPerfil(id: string, data: AtualizarUsuarioData): Promise<Usuario> {
    return prisma.usuario.update({
      where: { id },
      data,
    });
  }
}
