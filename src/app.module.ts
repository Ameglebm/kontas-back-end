import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './models/auth/auth.module';
import { UsuarioModule } from './models/usuario/usuario.module';
import { RepublicaModule } from './models/republicas/republica.module';
import { MoradorModule } from './models/morador/morador.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    AuthModule,
    UsuarioModule,
    RepublicaModule,
    MoradorModule,
  ],
})
export class AppModule {}
