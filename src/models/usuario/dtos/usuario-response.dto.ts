import { ApiProperty } from '@nestjs/swagger';
import {
    IsBoolean,
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsString,
    IsUUID,
} from 'class-validator';

export class UsuarioResponseDto {
    @ApiProperty({ example: 'uuid-usuario' })
    @IsUUID('4', { message: 'ID deve ser um UUID válido' })
    @IsNotEmpty({ message: 'ID não pode estar vazio' })
    id!: string;

    @ApiProperty({ example: 'usuario@email.com' })
    @IsEmail({}, { message: 'Email deve ser válido' })
    @IsNotEmpty({ message: 'Email não pode estar vazio' })
    email!: string;

    @ApiProperty({ example: 'João da Silva', required: false })
    @IsOptional({ message: 'Nome é opcional' })
    @IsString({ message: 'Nome deve ser uma string' })
    nome?: string;

    @ApiProperty({ example: 'link-da-foto.jpg', required: false })
    @IsOptional({ message: 'Foto é opcional' })
    @IsString({ message: 'Foto deve ser uma string' })
    fotoPerfil?: string;

    @ApiProperty({ example: 'chave-pix@email.com', required: false })
    @IsOptional({ message: 'Chave Pix é opcional' })
    @IsString({ message: 'Chave Pix deve ser uma string' })
    chavePix?: string;

    @ApiProperty({ example: '(24) 99999-9999', required: false })
    @IsOptional({ message: 'Telefone é opcional' })
    @IsString({ message: 'Telefone deve ser uma string' })
    telefone?: string;

    @ApiProperty({ example: true, description: 'Indica se o usuário completou o onboarding', })
    @IsNotEmpty({ message: 'perfilCompleto não pode estar vazio' })
    @IsBoolean({ message: 'perfilCompleto deve ser booleano' })
    perfilCompleto!: boolean;
}
