-- DropForeignKey
ALTER TABLE "codigos_verificacao" DROP CONSTRAINT "codigos_verificacao_usuarioId_fkey";

-- DropForeignKey
ALTER TABLE "contas" DROP CONSTRAINT "contas_republicaId_fkey";

-- DropForeignKey
ALTER TABLE "convites" DROP CONSTRAINT "convites_republicaId_fkey";

-- DropForeignKey
ALTER TABLE "moradores" DROP CONSTRAINT "moradores_republicaId_fkey";

-- AddForeignKey
ALTER TABLE "codigos_verificacao" ADD CONSTRAINT "codigos_verificacao_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "moradores" ADD CONSTRAINT "moradores_republicaId_fkey" FOREIGN KEY ("republicaId") REFERENCES "republicas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "convites" ADD CONSTRAINT "convites_republicaId_fkey" FOREIGN KEY ("republicaId") REFERENCES "republicas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contas" ADD CONSTRAINT "contas_republicaId_fkey" FOREIGN KEY ("republicaId") REFERENCES "republicas"("id") ON DELETE CASCADE ON UPDATE CASCADE;
