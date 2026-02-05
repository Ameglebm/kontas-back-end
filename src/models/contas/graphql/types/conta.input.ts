import { Field, ObjectType, Float } from '@nestjs/graphql';
import { StatusConta } from '@prisma/client';

@ObjectType()
export class ContaType {
  @Field({ description: 'uuid-conta'})
  id!: string;

  @Field({ description: 'Descrição da conta'})
  descricao!: string;

  @Field(() => Float, { description: '50'})
  valor!: number;

  @Field({ description: '10/10/2010'})
  vencimento!: Date;

  @Field({ description: 'PAGO'})
  status!: StatusConta;

  @Field({ description: 'uuid da republica'})
  republicaId!: string;

  @Field({ description: '20/12/2020'})
  criadoEm!: Date;

  @Field({ description: '21/12/2020'})
  atualizadoEm!: Date;
  
}
