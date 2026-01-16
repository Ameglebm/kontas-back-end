import { Module } from '@nestjs/common';
import { RepublicaController } from './controllers/republicas.controller';
import { RepublicaService } from './service/republica.service';
import { RepublicaRepository } from './repository/republica.repository';


import {
  REPUBLICA_SERVICE,
  REPUBLICA_REPOSITORY,
} from './republica.constants';

@Module({
  controllers: [RepublicaController],
  providers: [
    {
      provide: REPUBLICA_SERVICE,
      useClass: RepublicaService,
    },
    {
      provide: REPUBLICA_REPOSITORY,
      useClass: RepublicaRepository,
    },
  ],
  exports: [REPUBLICA_SERVICE],
})
export class RepublicaModule {}
