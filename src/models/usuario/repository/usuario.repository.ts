import { Injectable } from '@nestjs/common';
import { UsuarioRepository } from '../interfaces/usuario.repository.interface';
import { prisma } from '../../../lib/prisma';
import {
  CriarUsuarioData,
  AtualizarUsuarioData,
} from '../types/usuario.type';

@Injectable()
export class PrismaUsuarioRepository implements UsuarioRepository {
  async criar(data: CriarUsuarioData) {
    return prisma.usuario.create({
      data,
    });
  }

  async buscarPorId(id: string) {
    return prisma.usuario.findUnique({
      where: { id },
    });
  }

  async buscarPorEmail(email: string) {
    return prisma.usuario.findUnique({
      where: { email },
    });
  }

  async atualizar(id: string, data: AtualizarUsuarioData) {
    return prisma.usuario.update({
      where: { id },
      data,
    });
  }
}
