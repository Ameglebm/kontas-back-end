import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CriarRepublicaDto {
    @ApiProperty({ example: 'Republica da Alegria' })
    @IsNotEmpty({ message: 'Nome da república não pode estar vazio' })
    @IsString({ message: 'Nome da república deve ser uma string' })
    nome!: string

    @ApiProperty({ example: 'https://exemplo.com/imagem.jpg', required: false })
    @IsOptional({ message: 'Imagem da república é opcional' })
    @IsString({ message: 'Imagem da república deve ser uma string' })
    imagemRepublica?: string

}

export class AtualizarRepublicaDto {
    @ApiProperty({ example: 'Republica da Galera', required: false })
    @IsOptional({ message: 'Nome da república é opcional' })
    @IsString({ message: 'Nome da república deve ser uma string' })
    nome?: string

    @ApiProperty({ example: 'https://exemplo.com/nova-imagem.jpg', required: false })
    @IsOptional({ message: 'Imagem da república é opcional' })
    @IsString({ message: 'Imagem da república deve ser uma string' })
    imagemRepublica?: string
}