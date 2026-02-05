import { Module } from '@nestjs/common';
import { ContaResolver } from './resolvers/contas.resolvers';
import { ContaService } from './service/contas.service';
import { ContaRepository } from './repository/contas.repository'
import { 
    CONTA_SERVICE,
    CONTA_REPOSITORY,
} from './contas.constants'
import { MORADOR_REPOSITORY } from '../morador/morador.constants';
import { MoradorRepository } from '../morador/repository/morador.repository';
import './graphql/enums/status.conta.enum';

@Module({
    providers: [
        ContaResolver,
        {
            provide: CONTA_SERVICE,
            useClass: ContaService,
        },
        {
            provide: CONTA_REPOSITORY,
            useClass: ContaRepository,
        },
        {
            provide: MORADOR_REPOSITORY,
            useClass: MoradorRepository,
        }
    ],
    exports: [CONTA_SERVICE]
})
export class ContaModule {}