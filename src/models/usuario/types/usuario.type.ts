export type Usuario = {
  id: string;
  email: string;

  nome: string | null;
  fotoPerfil: string | null;
  chavePix: string | null;
  telefone: string | null;

  perfilCompleto: boolean;

  criadoEm: Date;
  atualizadoEm: Date;
};

export type CriarUsuarioData = {
  email: string;
  nome?: string;
  fotoPerfil?: string;
};

export type AtualizarUsuarioData = {
  nome?: string;
  fotoPerfil?: string;
  chavePix?: string;
  telefone?: string;
  perfilCompleto?: boolean;
};
