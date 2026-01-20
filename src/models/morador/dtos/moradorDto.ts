import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { Role } from '@prisma/client';

export class CriarMoradorDto {
  @ApiProperty({ example: 'uuid-morador' })
  @IsNotEmpty({ message: 'moradorId é obrigatório' })
  @IsString({ message: 'moradorId deve ser uma string' })
  moradorId!: string;

  @ApiProperty({ example: 'uuid-republica' })
  @IsNotEmpty({ message: 'republicaId é obrigatório' })
  @IsString({ message: 'republicaId deve ser uma string' })
  republicaId!: string;

  @ApiProperty({
    example: Role.ADMIN,
    enum: Role,
  })
  @IsEnum(Role, {
    message: 'role deve ser ADMIN ou MORADOR',
  })
  role!: Role;
}
