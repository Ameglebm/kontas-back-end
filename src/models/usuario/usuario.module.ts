import { Module } from '@nestjs/common';
import { UsuarioService } from './service/usuario.service';
import { PrismaUsuarioRepository } from './repository/usuario.repository';
import { USUARIO_REPOSITORY } from './usuario.constants';
import { UsuarioController } from './controllers/usuario.controller';

@Module({
  controllers: [UsuarioController],
  providers: [
    UsuarioService,
    {
      provide: USUARIO_REPOSITORY,
      useClass: PrismaUsuarioRepository,
    },
  ],
})
export class UsuarioModule {}
