import { Role } from "@prisma/client";
export type Morador = {
  id: string;

  usuarioId: string;
  republicaId: string;

  role: Role;

  criadoEm: Date;
  atualizadoEm: Date;
};
