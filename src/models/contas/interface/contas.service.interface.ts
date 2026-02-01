import { CriarContaDto } from '../dtos/contasDto';
import { AtualizarContaDto } from '../dtos/contas-update.dto';
import { ContaResponseDto } from '../dtos/contas-responde.dts';

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
