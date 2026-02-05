import { CriarContaInput } from '../graphql/inputs/create-conta.type';
import { AtualizarContaInput } from '../graphql/inputs/update-conta.input';
import { ContaType } from '../graphql/types/conta.type';

export interface ContaService {
  criar(
    data: CriarContaInput,
    usuarioLogadoId: string,
  ): Promise<ContaType>;
  listarPorRepublica(republicaId: string): Promise<ContaType[]>;
  atualizarStatus(
    contaId: string,
    data: AtualizarContaInput,
    usuarioLogadoId: string,
  ): Promise<ContaType>;
  remover(contaId: string, usuarioLogadoId: string): Promise<void>;
}
