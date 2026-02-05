import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { AuthModule } from './models/auth/auth.module';
import { UsuarioModule } from './models/usuario/usuario.module';
import { RepublicaModule } from './models/republicas/republica.module';
import { MoradorModule } from './models/morador/morador.module';
import { ConviteModule } from './models/convite/convite.module';
import { ContaModule } from './models/contas/contas.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      introspection: true,
      playground: true, // playground agora é suportado via Apollo v5
      context: ({ req }) => ({ req }),
    }),

      AuthModule,
      UsuarioModule,
      RepublicaModule,
      MoradorModule,
      ConviteModule,
      ContaModule,
  ],
})
export class AppModule {}
