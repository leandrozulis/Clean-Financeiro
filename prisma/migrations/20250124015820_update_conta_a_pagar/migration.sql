/*
  Warnings:

  - You are about to drop the column `contaId` on the `contasAPagar` table. All the data in the column will be lost.
  - Added the required column `userId` to the `contasAPagar` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "contasAPagar" DROP CONSTRAINT "contasAPagar_contaId_fkey";

-- AlterTable
ALTER TABLE "contasAPagar" DROP COLUMN "contaId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "contasAPagar" ADD CONSTRAINT "contasAPagar_userId_fkey" FOREIGN KEY ("userId") REFERENCES "contas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
