-- CreateTable
CREATE TABLE "rendaFixa" (
    "id" TEXT NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "dtcadastro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dtatualizacao" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "rendaFixa_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "rendaFixa" ADD CONSTRAINT "rendaFixa_userId_fkey" FOREIGN KEY ("userId") REFERENCES "contas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
