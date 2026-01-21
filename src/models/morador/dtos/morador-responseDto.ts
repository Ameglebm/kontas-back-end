import { ApiProperty } from '@nestjs/swagger';

export class MoradorResponseDto {
  @ApiProperty({ example: 'uuid-morador' })
  id!: string;

  @ApiProperty({ example: 'uuid-usuario' })
  usuarioId!: string;

  @ApiProperty({ example: 'uuid-republica' })
  republicaId!: string;

  @ApiProperty({ example: 'ADMIN' })
  role!: 'ADMIN' | 'MORADOR';

  @ApiProperty({ example: '2025-01-01T10:00:00.000Z' })
  criadoEm!: Date;

  @ApiProperty({ example: '2025-01-01T10:00:00.000Z' })
  atualizadoEm!: Date;
}
