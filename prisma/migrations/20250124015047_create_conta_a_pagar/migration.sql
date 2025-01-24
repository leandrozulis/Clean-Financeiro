-- CreateTable
CREATE TABLE "contasAPagar" (
    "id" TEXT NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "descricao" TEXT NOT NULL,
    "parcelas" TEXT NOT NULL,
    "pago" TIMESTAMP(3),
    "dtcadastro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dtatualizacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cartaoId" TEXT NOT NULL,
    "contaId" TEXT NOT NULL,

    CONSTRAINT "contasAPagar_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "contasAPagar" ADD CONSTRAINT "contasAPagar_cartaoId_fkey" FOREIGN KEY ("cartaoId") REFERENCES "cartoes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contasAPagar" ADD CONSTRAINT "contasAPagar_contaId_fkey" FOREIGN KEY ("contaId") REFERENCES "contas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
