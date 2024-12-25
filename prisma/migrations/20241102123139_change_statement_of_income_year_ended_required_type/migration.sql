/*
  Warnings:

  - You are about to drop the column `userId` on the `IndividualTaxes` table. All the data in the column will be lost.
  - Made the column `statementOfIncomeYearEndedOn` on table `IndividualTaxes` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "IndividualTaxes" DROP CONSTRAINT "IndividualTaxes_userId_fkey";

-- AlterTable
ALTER TABLE "IndividualTaxes" DROP COLUMN "userId",
ALTER COLUMN "statementOfIncomeYearEndedOn" SET NOT NULL;

-- CreateTable
CREATE TABLE "SavedTaxReturns" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "individualTaxesId" TEXT,
    "completionPercent" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "lastSavedPage" INTEGER NOT NULL DEFAULT 1,
    "lastEditedField" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SavedTaxReturns_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SavedTaxReturns_individualTaxesId_key" ON "SavedTaxReturns"("individualTaxesId");

-- CreateIndex
CREATE INDEX "SavedTaxReturns_userId_idx" ON "SavedTaxReturns"("userId");

-- AddForeignKey
ALTER TABLE "SavedTaxReturns" ADD CONSTRAINT "SavedTaxReturns_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedTaxReturns" ADD CONSTRAINT "SavedTaxReturns_individualTaxesId_fkey" FOREIGN KEY ("individualTaxesId") REFERENCES "IndividualTaxes"("id") ON DELETE SET NULL ON UPDATE CASCADE;
