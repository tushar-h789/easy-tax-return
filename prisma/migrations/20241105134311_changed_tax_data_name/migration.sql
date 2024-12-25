/*
  Warnings:

  - You are about to drop the column `individualTaxes` on the `SavedTaxReturns` table. All the data in the column will be lost.
  - Added the required column `taxData` to the `SavedTaxReturns` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SavedTaxReturns" DROP COLUMN "individualTaxes",
ADD COLUMN     "taxData" JSONB NOT NULL;
