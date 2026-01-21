import { CriarMoradorDto } from '../dtos/moradorDto';
import { AtualizarMoradorDto } from '../dtos/morador-updateDto';
import { MoradorResponseDto } from '../dtos/morador-responseDto';

export interface MoradorService {
  criar(data: CriarMoradorDto): Promise<MoradorResponseDto>;

  listarPorRepublica(republicaId: string): Promise<MoradorResponseDto[]>;

  atualizar(
    usuarioIdId: string,
    data: AtualizarMoradorDto,
    usuarioLogadoId: string,
  ): Promise<MoradorResponseDto>;

  remover(
    moradorId: string,
    usuarioLogadoId: string,
  ): Promise<void>;
}
