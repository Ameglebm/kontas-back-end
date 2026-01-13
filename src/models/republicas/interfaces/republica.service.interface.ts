import { Republica } from '@prisma/client'
import { Role } from 'src/enums/role.enum';

export interface IRepublicaService {
    /**
   * 🔹 Criar uma nova república
   * O usuário que cria vira ADMIN automaticamente
   */
    criarRepublica(
        usuarioId: string,
        nome: string,
        imagemRepublica?: string,
    ): Promise<Republica>
    // 🔹 Buscar república pelo ID
    buscarRepublicaPorId(republicaId: string): Promise<Republica | null>;
    // 🔹 Listar repúblicas que o usuário participa
    listarRepublicaPorUsuario(usuarioId: string): Promise<Republica[]>;
    // 🔹 Atualizar dados da república (somente ADMIN)
    atualizarRepublica(
        republicaId: string,
        usuarioId: string,
        data: {
            nome?: string;
            imagemRepublica?: string;
        }
    ): Promise<Republica>;
    // 🔹 Deletar república (somente ADMIN)
    deletarRepublica(
        republicaId: string,
        usuarioId: string,
    ): Promise<void>;
}