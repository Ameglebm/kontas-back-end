import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UserResponseDto {
  @ApiProperty({ example: 'uuid-usuario' })
  @IsString({ message: 'ID deve ser uma string' })
  @IsNotEmpty({ message: 'ID não pode estar vazio' })
  id!: string;

  @ApiProperty({ example: 'joao@email.com' })
  @IsString({ message: 'Email deve ser uma string' })
  @IsNotEmpty({ message: 'Email não pode estar vazio' })
  email!: string;

  @ApiProperty({ example: 'João da Silva', required: false })
  @IsString({ message: 'Nome deve ser uma string' })
  @IsOptional({ message: 'Nome é opcional' })
  nome?: string;

  @ApiProperty({ example: 'link-da-foto.jpg', required: false })
  @IsString({ message: 'Foto deve ser uma string' })
  @IsOptional({ message: 'Foto é opcional' })
  fotoPerfil?: string;

  @ApiProperty({ example: 'Indica se o perfil foi completamente preenchido' })
  @IsBoolean({ message: 'perfilCompleto deve ser um booleano' })
  @IsNotEmpty({ message: 'perfilCompleto não pode estar vazio' })
  perfilCompleto!: boolean;

  @ApiProperty({ example: 'chave-pix@email.com', required: false })
  @IsString({ message: 'Chave pix deve ser uma string' })
  @IsOptional({ message: 'Chave pix é opcional' })
  chavePix?: string;

  @ApiProperty({ example: '(24) 99999-9999', required: false })
  @IsString({ message: 'Telefone deve ser uma string' })
  @IsOptional({ message: 'Telefone é opcional' })
  telefone?: string;
}

export class AuthResponseDto {
  @ApiProperty({ type: UserResponseDto })
  @IsNotEmpty({ message: 'User não pode estar vazio' })
  user!: UserResponseDto;

  @ApiProperty({ example: 'jwt.token.aqui' })
  @IsString({ message: 'Token deve ser uma string' })
  @IsNotEmpty({ message: 'Token não pode estar vazio' })
  token!: string;
}
