import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';

export class UserResponseDto {
  @ApiProperty({ example: 'uuid-usuario' })
  id!: string;

  @ApiProperty({ example: 'João da Silva' })
  nome!: string;

  @ApiProperty({ example: 'joao@email.com' })
  email!: string;

  @ApiProperty({ example: 'link-da-foto.jpg', required: false })
  fotoPerfil?: string;

  @ApiProperty({ example: Role.MORADOR, enum: Role })
  role!: Role;
}

export class AuthResponseDto {
  @ApiProperty({ type: UserResponseDto })
  user!: UserResponseDto;

  @ApiProperty({ example: 'jwt.token.aqui' })
  token!: string;
}
