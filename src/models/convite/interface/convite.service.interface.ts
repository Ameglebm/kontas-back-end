import { CriarConviteDto } from '../dtos/conviteDto';
import { AtualizarConviteDto } from '../dtos/convite-update.dto';
import { ConviteResponseDto } from '../dtos/convite-response.dto';

export interface ConviteService {
  criar(
    data: CriarConviteDto,
    usuarioLogadoId: string,
  ): Promise<ConviteResponseDto>;

  listarPorRepublica(
    republicaId: string,
  ): Promise<ConviteResponseDto[]>;

  atualizarStatus(
    conviteId: string,
    data: AtualizarConviteDto,
    email: string,
    usuarioId: string,
  ): Promise<ConviteResponseDto>;

  listarMeusConvites(
    email: string,
  ): Promise<ConviteResponseDto[]>;
}
