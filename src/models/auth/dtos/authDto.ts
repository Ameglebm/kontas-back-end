import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class GoogleAuthDto {
    @ApiProperty({ example: 'ya29.a0AfH6SMC...' })
    @IsString({ message: 'Token deve ser uma string' })
    @IsNotEmpty({ message: 'Token não pode estar vazio' })
    token!: string;
}

export class CompletarDadosRepublicaDto {
    @ApiProperty({ example: 'Nome' })
    @IsString({ message: 'Nome deve ser uma string' })
    @IsNotEmpty({ message: 'Nome não pode estar vazio' })
    nome!: string

    @ApiProperty({ example: 'Telefone' })
    @IsString({ message: 'Telefone deve ser uma string' })
    @IsNotEmpty({ message: 'Telefone não pode estar vazio' })
    telefone!: string

    @ApiProperty({ example: '123.554.789-00' })
    @IsString({ message: 'Chave pix deve ser uma string' })
    @IsNotEmpty({ message: 'Chave pix não pode estar vazia' })
    chavePix!: string

    @ApiProperty({ example: 'caminho/foto.jpg', required: false })
    @IsOptional({ message: 'Foto é opcional' })
    @IsString({ message: 'Foto deve ser uma string' })
    fotoPerfil?: string;
}

