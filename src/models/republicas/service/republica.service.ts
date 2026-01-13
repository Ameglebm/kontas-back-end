import {
    BadRequestException,
    ForbiddenException,
    Injectable,
} from '@nestjs/common';
import { IRepublicaService } from '../interfaces/republica.service.interface';
import { IRepublicaRepository } from '../interfaces/republica.repository.interface';
import { Role } from '../../../enums/role.enum';

@Injectable()
export class RepublicaService implements IRepublicaService {
    constructor(
        private readonly republicaRepository: IRepublicaRepository,
    ) { }

    async criarRepublica(
        usuarioId: string,
        nome: string,
        imagemRepublica?: string,
    ) {
        // 1️⃣ Cria a república
        const republica = await this.republicaRepository.criarRepublica({
            nome,
            imagemRepublica,
        });

        // 2️⃣ Vincula o usuário como ADMIN
        await this.republicaRepository.adicionarMorador({
            usuarioId,
            republicaId: republica.id,
            role: Role.ADMIN,
        });

        return republica;
    }

    async entrarRepublica(usuarioId: string, republicaId: string) {
        const jaEhMorador =
            await this.republicaRepository.buscarMorador(
                usuarioId,
                republicaId,
            );

        if (jaEhMorador) {
            throw new BadRequestException(
                'Usuário já faz parte da república',
            );
        }

        await this.republicaRepository.adicionarMorador({
            usuarioId,
            republicaId,
            role: Role.USER,
        });
    }

    async sairRepublica(usuarioId: string, republicaId: string) {
        const morador =
            await this.republicaRepository.buscarMorador(
                usuarioId,
                republicaId,
            );

        if (!morador) {
            throw new BadRequestException(
                'Usuário não faz parte da república',
            );
        }

        if (morador.role === Role.ADMIN) {
            throw new ForbiddenException(
                'Administrador não pode sair da república',
            );
        }

        await this.republicaRepository.removerMorador(
            morador.id,
        );
    }
}

// O criador da república tem opção de não pagar ou pagar "entrar na divisão"