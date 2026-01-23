import { Injectable, ForbiddenException, NotFoundException, Inject } from '@nestjs/common';
import { MoradorService as IMoradorService } from '../interface/morador.service.interface';
import { MoradorRepository } from '../repository/morador.repository';
import { CriarMoradorDto } from '../dtos/moradorDto';
import { AtualizarMoradorDto } from '../dtos/morador-updateDto';
import { MoradorListResponseDto, MoradorResponseDto } from '../dtos/morador-responseDto';
import { Role } from '@prisma/client';
import { MORADOR_REPOSITORY } from '../morador.constants'

@Injectable()
export class MoradorService implements IMoradorService {
  constructor(
    @Inject(MORADOR_REPOSITORY)
    private readonly moradorRepository: MoradorRepository,
  ) { }

  async criar(data: CriarMoradorDto): Promise<MoradorResponseDto> {
    const existente = await this.moradorRepository.buscarPorUsuarioERepublica(
      data.usuarioId,
      data.republicaId,
    );

    if (existente) {
      throw new ForbiddenException('Usuário já é morador desta república');
    }

    const morador = await this.moradorRepository.criar({
      usuarioId: data.usuarioId,
      republicaId: data.republicaId,
      role: data.role,
    });

    return this.toResponse(morador);
  }

  async listarPorRepublica(
    republicaId: string,
  ): Promise<MoradorListResponseDto[]> {
    const moradores = await this.moradorRepository.listarPorRepublica(
      republicaId,
    );

    return moradores.map(this.toListResponse);
  }


  async atualizar(
    moradorId: string,
    data: AtualizarMoradorDto,
    usuarioLogadoId: string,
  ): Promise<MoradorResponseDto> {
    const morador = await this.moradorRepository.buscarPorId(moradorId);

    if (!morador) {
      throw new NotFoundException('Morador não encontrado');
    }

    const admin = await this.moradorRepository.buscarPorUsuarioERepublica(
      usuarioLogadoId,
      morador.republicaId,
    );

    if (!admin || admin.role !== Role.ADMIN) {
      throw new ForbiddenException('Apenas ADMIN pode executar esta ação');
    }

    const atualizado = await this.moradorRepository.atualizar(
      moradorId,
      morador.republicaId,
      data,
    );

    return this.toResponse(atualizado);
  }

  async remover(
    moradorId: string,
    usuarioLogadoId: string,
  ): Promise<void> {
    const morador = await this.moradorRepository.buscarPorId(moradorId);

    if (!morador) {
      throw new NotFoundException('Morador não encontrado');
    }

    const admin = await this.moradorRepository.buscarPorUsuarioERepublica(
      usuarioLogadoId,
      morador.republicaId,
    );

    if (!admin || admin.role !== Role.ADMIN) {
      throw new ForbiddenException('Apenas ADMIN pode remover morador');
    }

    await this.moradorRepository.remover(moradorId);
  }

  // 🔁 conversão padrão
  private toResponse(morador: any): MoradorResponseDto {
    return {
      id: morador.id,
      usuarioId: morador.usuarioId,
      republicaId: morador.republicaId,
      role: morador.role,
      criadoEm: morador.criadoEm,
      atualizadoEm: morador.atualizadoEm,
    };
  }

  private toListResponse(morador: any): MoradorListResponseDto {
    return {
      id: morador.id,
      nome: morador.usuario.nome,
      email: morador.usuario.email,
      fotoPerfil: morador.usuario.fotoPerfil,
      chavePix: morador.usuario.chavePix,
      telefone: morador.usuario.telefone,
      role: morador.role,
    };
  }


}
