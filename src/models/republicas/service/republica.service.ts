import {
    Inject,
    Injectable,
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
    async atualizarRepublica(republicaId: string, usuarioIdId: string, data: { nome?: string; imagemRepublica?: string; }): Promise<Republica> {
        return this.republicaRepository.atualizarRepublica(republicaId, data);
    }
    async buscarRepublicaPorId(republicaId: string): Promise<Republica | null> {
        return this.republicaRepository.buscarPorId(republicaId);
    }
    async listarRepublicaPorUsuario(usuarioId: string): Promise<Republica[]> {
        return this.republicaRepository.listarPorUsuario(usuarioId);
    }
    async deletarRepublica(republicaId: string, usuarioId: string): Promise<void> {
        return this.republicaRepository.deletar(republicaId);
    }
}