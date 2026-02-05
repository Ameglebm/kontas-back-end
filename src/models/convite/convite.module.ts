import { Module } from '@nestjs/common';
import { ConviteController } from './controllers/convite.controller';
import { ConviteService } from './service/convite.service';
import { ConviteRepository } from './repository/convite.repository';
import { CONVITE_REPOSITORY, CONVITE_SERVICE } from './convite.constants';
import { MORADOR_REPOSITORY } from '../morador/morador.constants';
import { MoradorRepository } from '../morador/repository/morador.repository'

@Module({
    providers: [
        ConviteController,
        {
            provide: CONVITE_SERVICE,
            useClass: ConviteService,
        },
        {
            provide: CONVITE_REPOSITORY,
            useClass: ConviteRepository,
        },
        {
            provide: MORADOR_REPOSITORY,
            useClass: MoradorRepository,
        }
    ],
    exports: [CONVITE_SERVICE],
})
export class ConviteModule {}