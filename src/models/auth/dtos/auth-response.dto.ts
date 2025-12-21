import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({ example: 'uuid-usuario' })
  id!: string;

  @ApiProperty({ example: 'joao@email.com' })
  email!: string;

  @ApiProperty({ example: 'João da Silva' })
  nome?: string;

  @ApiProperty({ example: 'link-da-foto.jpg', required: false })
  fotoPerfil?: string;

  @ApiProperty({ example: ''})
  verificado!: boolean;
}

export class AuthResponseDto {
  @ApiProperty({ type: UserResponseDto })
  user!: UserResponseDto;

  @ApiProperty({ example: 'jwt.token.aqui' })
  token!: string;
}
