/*
  Warnings:

  - You are about to drop the column `moradorId` on the `moradores` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[usuarioId,republicaId]` on the table `moradores` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `usuarioId` to the `moradores` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "moradores" DROP CONSTRAINT "moradores_moradorId_fkey";

-- DropIndex
DROP INDEX "moradores_moradorId_republicaId_key";

-- AlterTable
ALTER TABLE "moradores" DROP COLUMN "moradorId",
ADD COLUMN     "usuarioId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "moradores_usuarioId_republicaId_key" ON "moradores"("usuarioId", "republicaId");

-- AddForeignKey
ALTER TABLE "moradores" ADD CONSTRAINT "moradores_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
