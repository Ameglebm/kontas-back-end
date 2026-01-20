import { Module } from '@nestjs/common';
import { MoradorController } from './controllers/morador.controller';
import { MoradorService } from './service/morador.service';
import { MoradorRepository } from './repository/morador.repository';
import { 
    MORADOR_SERVICE,
    MORADOR_REPOSITORY
} from './morador.constants';

@Module({
    controllers: [MoradorController],
    providers: [
        {
            provide: MORADOR_SERVICE,
            useClass: MoradorService,
        },
        {
            provide: MORADOR_REPOSITORY,
            useClass: MoradorRepository
        }
    ],
    exports: [MORADOR_SERVICE],
})
export class MoradorModule {}