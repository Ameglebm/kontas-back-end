import { Conta, StatusConta } from '@prisma/client';

export interface IContaRepository {
  criar(data: {
    descricao: string;
    valor: number;
    vencimento: Date;
    status: StatusConta;
    republicaId: string;
    criadoPorId: string;
  }): Promise<Conta>;
  buscarPorId(id: string): Promise<Conta | null>;
  listarPorRepublica(republicaId: string): Promise<Conta[]>;
  atualizarStatus(
    contaId: string,
    status: StatusConta,
  ): Promise<Conta>;
  remover(contaId: string): Promise<void>;
}
