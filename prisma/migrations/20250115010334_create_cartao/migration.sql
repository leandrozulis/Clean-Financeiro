-- CreateTable
CREATE TABLE "Cartao" (
    "id" TEXT NOT NULL,
    "limite" DOUBLE PRECISION NOT NULL,
    "descricao" TEXT NOT NULL,
    "nomeBanco" TEXT NOT NULL,
    "dtfechamento" TEXT NOT NULL,
    "dtvencimento" TEXT NOT NULL,
    "dtcadastro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dtatualizacao" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Cartao_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Cartao" ADD CONSTRAINT "Cartao_userId_fkey" FOREIGN KEY ("userId") REFERENCES "contas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
