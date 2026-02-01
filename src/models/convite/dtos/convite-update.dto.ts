import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { StatusConvite } from '@prisma/client'

export class AtualizarConviteDto {
  @ApiProperty({
    example: StatusConvite.ACEITO,
    enum: StatusConvite,
    description: 'Novo status do convite',
  })
  @IsEnum(StatusConvite, {
    message: 'status deve ser PENDENTE, ACEITO ou RECUSADO',
  })
  status!: StatusConvite;
}
