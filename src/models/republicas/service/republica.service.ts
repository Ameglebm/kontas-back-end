import {
    Inject,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { IRepublicaService } from '../interfaces/republica.service.interface';
import { Republica } from '@prisma/client';
import { RepublicaRepository } from '../repository/republica.repository';
import { REPUBLICA_REPOSITORY } from '../republica.constants';

@Injectable()
export class RepublicaService implements IRepublicaService {
    constructor(
        @Inject(REPUBLICA_REPOSITORY)
        private readonly republicaRepository: RepublicaRepository,
    ) { }

    // Fazer tratamento de erros depois aqui
    async criarRepublica(
        usuarioId: string,
        nome: string,
        imagemRepublica?: string,
    ): Promise<Republica> {
        return this.republicaRepository.criarRepublica({
            usuarioId,
            nome,
            imagemRepublica,
        })
    }
    async atualizarRepublica(
        republicaId: string,
        usuarioId: string,
        data: { nome?: string; imagemRepublica?: string },
    ): Promise<Republica> {
        const republica = await this.republicaRepository.buscarPorId(republicaId);
        if (!republica) {
            throw new NotFoundException('República não encontrada');
        }
        // 🔒 FUTURO (quando checar role):
        // if (!isAdmin) {
        //   throw new ForbiddenException('Apenas ADMIN pode atualizar a república');
        // }
        return this.republicaRepository.atualizarRepublica(republicaId, data);
    }
    async buscarRepublicaPorId(republicaId: string): Promise<Republica> {
        const republica = await this.republicaRepository.buscarPorId(republicaId);

        if (!republica) {
            throw new NotFoundException('República não encontrada');
        }

        return republica;
    }
    async listarRepublicaPorUsuario(usuarioId: string): Promise<Republica[]> {
        return this.republicaRepository.listarPorUsuario(usuarioId);
    }
    async deletarRepublica(
        republicaId: string,
        usuarioId: string,
    ): Promise<void> {
        const republica = await this.republicaRepository.buscarPorId(republicaId);
        if (!republica) {
            throw new NotFoundException('República não encontrada');
        }
        // 🔒 FUTURO
        // if (!isAdmin) {
        //   throw new ForbiddenException('Apenas ADMIN pode deletar a república');
        // }
        await this.republicaRepository.deletar(republicaId);
    }
}