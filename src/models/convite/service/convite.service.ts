import {
  Injectable,
  ForbiddenException,
  NotFoundException,
  Inject,
} from '@nestjs/common';
import { ConviteService as IConviteService } from '../interface/convite.service.interface';
import { ConviteRepository } from '../repository/convite.repository';
import { CriarConviteDto } from '../dtos/conviteDto';
import { AtualizarConviteDto } from '../dtos/convite-update.dto';
import { ConviteResponseDto } from '../dtos/convite-response.dto';
import { Role, StatusConvite } from '@prisma/client';
import { CONVITE_REPOSITORY } from '../convite.constants';
import { MORADOR_REPOSITORY } from 'src/models/morador/morador.constants';
import { MoradorRepository } from '../../morador/repository/morador.repository'

@Injectable()
export class ConviteService implements IConviteService {
  constructor(
    @Inject(CONVITE_REPOSITORY)
    private readonly conviteRepository: ConviteRepository,

    @Inject(MORADOR_REPOSITORY)
    private readonly moradorRepository: MoradorRepository,
  ) {}

  async criar(
    data: CriarConviteDto,
    usuarioLogadoId: string,
  ): Promise<ConviteResponseDto> {
    // 🔒 só ADMIN da república pode convidar
    const admin = await this.moradorRepository.buscarPorUsuarioERepublica(
      usuarioLogadoId,
      data.republicaId,
    );

    if (!admin || admin.role !== Role.ADMIN) {
      throw new ForbiddenException('Apenas ADMIN pode criar convites');
    }

    const existente = await this.conviteRepository.buscarPorUsuarioERepublica(
      data.email,
      data.republicaId,
    );

    if (existente) {
      throw new ForbiddenException('Usuário já possui convite para esta república');
    }

    const convite = await this.conviteRepository.criar({
      email: data.email,
      republicaId: data.republicaId,
      status: StatusConvite.PENDENTE,
      role: Role.ADMIN
    });

    return this.toResponse(convite);
  }

  async listarPorRepublica(
    republicaId: string,
  ): Promise<ConviteResponseDto[]> {
    const convites = await this.conviteRepository.listarPorRepublica(
      republicaId,
    );

    return convites.map(this.toResponse);
  }

  async atualizarStatus(
    conviteId: string,
    data: AtualizarConviteDto,
    usuarioLogadoId: string,
  ): Promise<ConviteResponseDto> {
    const convite = await this.conviteRepository.buscarPorId(conviteId);

    if (!convite) {
      throw new NotFoundException('Convite não encontrado');
    }

    // 🔒 só o usuário convidado pode aceitar/recusar
    if (convite.usuarioId !== usuarioLogadoId) {
      throw new ForbiddenException('Você não pode alterar este convite');
    }

    const atualizado = await this.conviteRepository.atualizarStatus(
      conviteId,
      data.status,
    );

    return this.toResponse(atualizado);
  }

  // 🔁 conversão padrão
  private toResponse(convite: any): ConviteResponseDto {
    return {
      id: convite.id,
      email: convite.email,
      republicaId: convite.republicaId,
      status: convite.status,
      criadoEm: convite.criadoEm,
      atualizadoEm: convite.atualizadoEm,
    };
  }
}
