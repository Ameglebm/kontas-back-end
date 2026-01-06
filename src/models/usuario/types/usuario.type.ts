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
