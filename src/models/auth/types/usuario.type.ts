export type Usuario = {
  id: string;
  email: string;
  nome?: string | null;
  fotoPerfil?: string | null;
  telefone?: string | null;
  chavePix?: string | null;
  perfilCompleto: boolean;
  criadoEm: Date;
  atualizadoEm: Date;
};
