import { Republica } from '@prisma/client';

export interface IRepublicaRepository {
    criarRepublica(data: {
        nome: string;
        imagemRepublica?: string;
    }): Promise<Republica>;
    buscarPorId(id: string): Promise<Republica | null>;
    listarPorUsuario(usuarioId: string): Promise<Republica[]>;
    atualizarRepublica(
        id: string,
        data: {
            nome?: string;
            imagemRepublica?: string;
        }
    ): Promise<Republica>;
    deletar(id: string): Promise<void>;
}
