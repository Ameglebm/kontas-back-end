import {
  Injectable,
  ForbiddenException,
  NotFoundException,
  Inject,
} from '@nestjs/common';
import { ContaService as IContaService } from '../interface/contas.service.interface';
import type { IContaRepository } from '../interface/contas.repository.interface'
import { CriarContaInput } from '../graphql/inputs/create-conta.type';
import { AtualizarContaInput } from '../graphql/inputs/update-conta.input';
import { ContaType } from '../graphql/types/conta.type';
import { Conta, Role, StatusConta } from '@prisma/client';
import { CONTA_REPOSITORY } from '../contas.constants';
import { MORADOR_REPOSITORY } from 'src/models/morador/morador.constants';
import { MoradorRepository } from 'src/models/morador/repository/morador.repository';
import { ContaAdapter } from '../common/conta.common';

@Injectable()
export class ContaService implements IContaService {
  constructor(
    @Inject(CONTA_REPOSITORY)
    private readonly contaRepository: IContaRepository,

    @Inject(MORADOR_REPOSITORY)
    private readonly moradorRepository: MoradorRepository,
  ) { }

  async criar(data: CriarContaInput, usuarioLogadoId: string) {
    const admin = await this.moradorRepository.buscarPorUsuarioERepublica(
      usuarioLogadoId,
      data.republicaId,
    );
    if (!admin || admin.role !== Role.ADMIN) {
      throw new ForbiddenException('Apenas ADMIN pode criar contas');
    }
    const conta = await this.contaRepository.criar({
      descricao: data.descricao,
      valor: data.valor,
      vencimento: data.vencimento,
      status: data.status ?? StatusConta.PENDENTE,
      republicaId: data.republicaId,
      criadoPorId: admin.id,
    });
    // verifiacar se vai colocar divisao da conta com morador aqui
    // Valores customizados
    // Decide quem entra na conta, ele convida os moradores
    return this.toResponse(conta);
  }

  async listarPorRepublica(republicaId: string) {
    const contas = await this.contaRepository.listarPorRepublica(republicaId);
    return contas.map(this.toResponse);
  }

  async atualizarStatus(
    contaId: string,
    data: AtualizarContaInput,
    usuarioLogadoId: string,
  ) {
    const conta = await this.contaRepository.buscarPorId(contaId);
    if (!conta) {
      throw new NotFoundException('Conta não encontrada');
    }
    const admin = await this.moradorRepository.buscarPorUsuarioERepublica(
      usuarioLogadoId,
      conta.republicaId,
    );
    if (!admin || admin.role !== Role.ADMIN) {
      throw new ForbiddenException('Apenas ADMIN pode alterar conta');
    }
    if (!data.status) {
      throw new ForbiddenException('Status é obrigatorio')
    }
    const atualizada = await this.contaRepository.atualizarStatus(
      contaId,
      data.status,
    );
    return this.toResponse(atualizada);
  }

  async remover(contaId: string, usuarioLogadoId: string) {
    const conta = await this.contaRepository.buscarPorId(contaId);
    if (!conta) {
      throw new NotFoundException('Conta não encontrada');
    }
    const admin = await this.moradorRepository.buscarPorUsuarioERepublica(
      usuarioLogadoId,
      conta.republicaId,
    );
    if (!admin || admin.role !== Role.ADMIN) {
      throw new ForbiddenException('Apenas ADMIN pode remover conta');
    }
    await this.contaRepository.remover(contaId);
  }
  // Criar Patch update para atualizar conta e somente o admin da conta pode atualizar
  private toResponse(conta: Conta): ContaType{
    return ContaAdapter.toGraphQL(conta);
  }
}
