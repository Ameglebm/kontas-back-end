import { IsDateString, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { StatusConta } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CriarContaDto {
  @ApiProperty({ example: 'Descrição da conta'})
  @IsString({ message: 'Descrição tem que ser uma string'})
  @IsNotEmpty({ message: 'Descrição não pode ficar vazio'})
  descricao!: string;

  @ApiProperty({ example: 34 })
  @IsNotEmpty({ message: 'Valor nao pode ficar vazio'})
  @IsNumber({}, { message: 'Valor tem que ser numero'})
  valor!: number;

  @ApiProperty({ example: '10/10/2015'})
  @IsNotEmpty({ message: 'Vencimento não pode ficar vazio'})
  @IsDateString({}, { message: 'Vencimento é do tipo Date'})
  vencimento!: Date;

  @ApiProperty({ example: 'Id da republica'})
  @IsNotEmpty({ message: 'Republica não pode ficar vazio'})
  @IsString({ message: 'Republica é uma string'})
  republicaId: string;

  @ApiProperty({ example: 'Pago', required: false})
  @IsOptional({ message: 'Status é opcional'})
  @IsEnum(StatusConta)
  status?: StatusConta;
}
