import { Injectable } from '@nestjs/common';
import { prisma } from 'src/lib/prisma';
import { StatusConta, Conta } from '@prisma/client';
import { IContaRepository } from '../interface/contas.repository.interface';

@Injectable()
export class ContaRepository implements IContaRepository {

  async criar(data: {
    descricao: string;
    valor: number;
    vencimento: Date;
    status: StatusConta;
    republicaId: string;
    criadoPorId: string;
  }): Promise<Conta> {
    return prisma.conta.create({ data });
  }

  buscarPorId(id: string): Promise<Conta | null> {
    return prisma.conta.findUnique({ where: { id } });
  }

  listarPorRepublica(republicaId: string): Promise<Conta[]> {
    return prisma.conta.findMany({
      where: { republicaId },
      orderBy: { vencimento: 'asc' },
    });
  }

  atualizarStatus(contaId: string, status: StatusConta): Promise<Conta> {
    return prisma.conta.update({
      where: { id: contaId },
      data: {
        status: { set: status },
      },
    });
  }


  remover(contaId: string): Promise<void> {
    return prisma.conta.delete({ where: { id: contaId } }).then(() => undefined);
  }
}
