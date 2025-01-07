/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `contas` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `contas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `senha` to the `contas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "contas" ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "senha" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "contas_email_key" ON "contas"("email");
