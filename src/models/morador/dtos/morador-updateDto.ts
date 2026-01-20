import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { Role } from '@prisma/client';

export class AtualizarMoradorDto {
  @ApiProperty({
    example: Role.ADMIN,
    enum: Role,
    required: false,
  })
  @IsOptional()
  @IsEnum(Role, {
    message: 'role deve ser ADMIN ou MORADOR',
  })
  role?: Role;

}
