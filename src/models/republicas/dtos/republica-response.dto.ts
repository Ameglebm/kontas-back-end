import { ApiProperty } from "@nestjs/swagger";

export class RepublicaResponseDto {
    @ApiProperty({ example: '1' })
    id!: string

    @ApiProperty({ example: 'Republica da Galera' })
    nome!: string

    @ApiProperty({ example: 'https://exemplo.com/imagem.jpg', required: false })
    imagemRepublica?: string
}