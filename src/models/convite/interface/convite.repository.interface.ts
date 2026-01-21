import { StatusConvite, Convite } from '@prisma/client';

export interface ConviteRepository {
  criar(data: {
    email: string;
    republicaId: string;
    status: StatusConvite;
  }): Promise<Convite>;

  buscarPorId(conviteId: string): Promise<Convite | null>;

  buscarPorUsuarioERepublica(
    email: string,
    republicaId: string,
  ): Promise<Convite | null>;

  listarPorRepublica(republicaId: string): Promise<Convite[]>;

  atualizarStatus(
    conviteId: string,
    status: StatusConvite,
  ): Promise<Convite>;

  remover(conviteId: string): Promise<void>;
}
