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
export class MoradorListResponseDto {
  @ApiProperty({ example: 'uuid-morador' })
  id!: string;

  @ApiProperty({ example: 'João' })
  nome!: string;

  @ApiProperty({ example: 'joao@email.com' })
  email!: string;

  @ApiProperty({ example: 'link-da-foto.jpg', nullable: true })
  fotoPerfil!: string | null;

  @ApiProperty({ example: 'chave-pix@email.com', nullable: true })
  chavePix!: string | null;

  @ApiProperty({ example: '(24) 99999-9999', nullable: true })
  telefone!: string | null;

  @ApiProperty({ example: 'USER' })
  role!: 'ADMIN' | 'USER';
}

