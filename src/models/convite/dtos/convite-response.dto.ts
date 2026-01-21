import { ApiProperty } from '@nestjs/swagger';
import { StatusConvite } from '@prisma/client';

export class ConviteResponseDto {
  @ApiProperty({ example: 'uuid-convite' })
  id!: string;

  @ApiProperty({ example: 'Email do usuario' })
  email!: string;

  @ApiProperty({ example: 'uuid-republica' })
  republicaId!: string;

  @ApiProperty({
    example: StatusConvite.PENDENTE,
    enum: StatusConvite,
  })
  status!: StatusConvite;

  @ApiProperty({ example: '2025-01-01T10:00:00.000Z' })
  criadoEm!: Date;

  @ApiProperty({ example: '2025-01-01T10:00:00.000Z' })
  atualizadoEm!: Date;
}
