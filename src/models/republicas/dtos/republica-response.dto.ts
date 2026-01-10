import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty } from "class-validator";

export class RepublicaResponseDto {
    @ApiProperty({ example: '1' })
    @IsNotEmpty({ message: 'ID da república não pode estar vazio' })
    @IsString({ message: 'ID da república deve ser uma string' })
    id!: string

    @ApiProperty({ example: 'Republica da Galera' })
    @IsNotEmpty({ message: 'Nome da república não pode estar vazio' })
    @IsString({ message: 'Nome da república deve ser uma string' })
    nome!: string

    @ApiProperty({ example: 'https://exemplo.com/imagem.jpg', required: false })
    @IsNotEmpty({ message: 'Imagem da república não pode estar vazia' })
    @IsString({ message: 'Imagem da república deve ser uma string' })
    imagemRepublica!: string
}