import { Injectable } from '@nestjs/common';
import { prisma } from '../../../lib/prisma';
import { Usuario } from '../types/usuario.type';
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
        perfilCompleto: false, // SEMPRE inicia incompleto
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
        perfilCompleto: true, // regra centralizada aqui
      },
    });
  }

  async atualizarPerfil(
    userId: string,
    data: {
      nome?: string;
      telefone?: string;
      chavePix?: string;
      fotoPerfil?: string;
    }
  ): Promise<Usuario> {
    return prisma.usuario.update({
      where: { id: userId },
      data: {
        ...(data.nome !== undefined && { nome: data.nome }),
        ...(data.telefone !== undefined && { telefone: data.telefone }),
        ...(data.chavePix !== undefined && { chavePix: data.chavePix }),
        ...(data.fotoPerfil !== undefined && { fotoPerfil: data.fotoPerfil }),
        // ⚠️ NÃO altera perfilCompleto aqui
      },
    });
  }
}
