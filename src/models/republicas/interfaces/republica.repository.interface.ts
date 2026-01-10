import { Republica } from '../types/republica.type';

export interface IRepublicaRepository {
    criar(data: {
        nome: string;
        imagemRepublica?: string;
    }): Promise<Republica>;
    bucarPorId(id: string): Promise<Republica> | null;
    atualizar(
        id: string,
        data: {
            nome?: string;
            imagemRepublica?: string
        }
    ): Promise<Republica>;
    deletar(id: string): Promise<void>;
}
