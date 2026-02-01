import { IsEnum, IsOptional } from 'class-validator';
import { StatusConta } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class AtualizarContaDto {
  @ApiProperty({ example: 'PAGO'})
  @IsEnum(StatusConta)
  @IsOptional()
  status: StatusConta;
}
