/*
  Warnings:

  - You are about to drop the `Cartao` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Cartao" DROP CONSTRAINT "Cartao_userId_fkey";

-- DropTable
DROP TABLE "Cartao";

-- CreateTable
CREATE TABLE "cartoes" (
    "id" TEXT NOT NULL,
    "limite" DOUBLE PRECISION NOT NULL,
    "descricao" TEXT NOT NULL,
    "nomeBanco" TEXT NOT NULL,
    "dtfechamento" TEXT NOT NULL,
    "dtvencimento" TEXT NOT NULL,
    "dtcadastro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dtatualizacao" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "cartoes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "cartoes" ADD CONSTRAINT "cartoes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "contas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
