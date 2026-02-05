import { IsDateString, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { StatusConta } from '@prisma/client';
import { InputType, Field, Float } from '@nestjs/graphql'

@InputType()
export class CriarContaInput {

  @Field({ description: 'Conta de luz'})
  @IsString({ message: 'Descrição tem que ser uma string'})
  @IsNotEmpty({ message: 'Descrição não pode ficar vazio'})
  descricao!: string;

  @Field(() => Float, { description: '350,50'})
  @IsNotEmpty({ message: 'Valor nao pode ficar vazio'})
  @IsNumber({}, { message: 'Valor tem que ser numero'})
  valor!: number;

  @Field({ description: '10/10/2015'})
  @IsNotEmpty({ message: 'Vencimento não pode ficar vazio'})
  @IsDateString({}, { message: 'Vencimento é do tipo Date'})
  vencimento!: Date;

  @Field({ description: 'Id da republica'})
  @IsNotEmpty({ message: 'Republica não pode ficar vazio'})
  @IsString({ message: 'Republica é uma string'})
  republicaId: string;

  @Field(() => StatusConta, { 
    nullable: true,
    description: 'Status da conta'
  })
  @IsOptional({ message: 'Status é opcional'})
  @IsEnum(StatusConta)
  status?: StatusConta;
}
