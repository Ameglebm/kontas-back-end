import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CriarConviteDto {
    @ApiProperty({ example: 'usuario@email.com' })
    @IsString({ message: 'Email deve ser uma string' })
    email!: string;;

    @ApiProperty({
        example: 'uuid-republica',
        description: 'República do convite',
    })
    @IsString({ message: 'Convite para republica deve ser uma string' })
    @IsNotEmpty({ message: 'Convite para republica não pode ficar vazio' })
    republicaId!: string;
}
