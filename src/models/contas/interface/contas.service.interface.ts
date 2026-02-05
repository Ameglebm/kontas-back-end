import { CriarContaDto } from '../graphql/inputs/create-conta.type';
import { AtualizarContaDto } from '../graphql/inputs/update-conta.input';
import { ContaResponseDto } from '../graphql/types/conta.input';

export interface ContaService {
  criar(
    data: CriarContaDto,
    usuarioLogadoId: string,
  ): Promise<ContaResponseDto>;
  listarPorRepublica(republicaId: string): Promise<ContaResponseDto[]>;
  atualizarStatus(
    contaId: string,
    data: AtualizarContaDto,
    usuarioLogadoId: string,
  ): Promise<ContaResponseDto>;
  remover(contaId: string, usuarioLogadoId: string): Promise<void>;
}
