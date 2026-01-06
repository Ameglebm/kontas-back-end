import { ApiProperty } from '@nestjs/swagger';
import {
    IsOptional,
    IsString,
    IsUUID,
    IsBoolean,
    IsNotEmpty,
} from 'class-validator';
/**
 * 🔹 Atualizar perfil do usuário (pós-onboarding)
 * 🔹 Não substitui CompletarDadosRepublicaDto
 */
export class AtualizarUsuarioDto {
    @ApiProperty({ example: 'João da Silva', required: false })
    @IsOptional({ message: 'Nome é opcional' })
    @IsString({ message: 'Nome deve ser uma string' })
    nome?: string;

    @ApiProperty({ example: '(24) 99999-9999', required: false })
    @IsOptional({ message: 'Telefone é opcional' })
    @IsString({ message: 'Telefone deve ser uma string' })
    telefone?: string;

    @ApiProperty({ example: 'chave-pix@email.com', required: false })
    @IsOptional({ message: 'Chave pix é opcional' })
    @IsString({ message: 'Chave pix deve ser uma string' })
    chavePix?: string;

    @ApiProperty({ example: 'link-da-foto.jpg', required: false })
    @IsOptional({ message: 'Foto é opcional' })
    @IsString({ message: 'Foto deve ser uma string' })
    fotoPerfil?: string;
}
/**
 * 🔹 Entrar em uma república (via código ou convite)
 */
export class EntrarRepublicaDto {
    @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
    @IsNotEmpty({ message: 'ID da república não pode estar vazio' })
    @IsUUID('4', { message: 'ID da república deve ser um UUID válido' })
    republicaId!: string;
}
/**
 * 🔹 Aceitar convite para república
 */
export class AceitarConviteDto {
    @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
    @IsNotEmpty({ message: 'ID do convite não pode estar vazio' })
    @IsUUID('4', { message: 'ID do convite deve ser um UUID válido' })
    conviteId!: string;
}
/**
 * 🔹 Sair da república atual
 */
export class SairRepublicaDto {
    @ApiProperty({ example: true })
    @IsNotEmpty({ message: 'Confirmar não pode estar vazio' })
    @IsBoolean({ message: 'Confirmar deve ser um valor booleano' })
    confirmar!: boolean;
}
/**
 * 🔹 Deletar conta do usuário (soft delete)
 */
export class DeletarUsuarioDto {
    @ApiProperty({ example: true })
    @IsNotEmpty({ message: 'Confirmar não pode estar vazio' })
    @IsBoolean({ message: 'Confirmar deve ser um valor booleano' })
    confirmar!: boolean;
}
