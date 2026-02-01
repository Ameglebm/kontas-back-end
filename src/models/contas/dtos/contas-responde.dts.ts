import { ApiProperty } from '@nestjs/swagger';
import { StatusConta } from '@prisma/client';

export class ContaResponseDto {
  @ApiProperty({ example: 'uuid-conta'})
  id!: string;

  @ApiProperty({ example: 'Descrição da conta'})
  descricao!: string;

  @ApiProperty({ example: 50})
  valor!: number;

  @ApiProperty({ example: '10/10/2010'})
  vencimento!: Date;

  @ApiProperty({ example: 'PAGO'})
  status!: StatusConta;

  @ApiProperty({ example: 'uuid da republica'})
  republicaId!: string;

  @ApiProperty({ example: '20/12/2020'})
  criadoEm!: Date;

  @ApiProperty({ example: '21/12/2020'})
  atualizadoEm!: Date;
  
}
