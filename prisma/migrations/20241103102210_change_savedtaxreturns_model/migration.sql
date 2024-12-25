/*
  Warnings:

  - You are about to drop the column `individualTaxesId` on the `SavedTaxReturns` table. All the data in the column will be lost.
  - You are about to drop the column `lastSavedPage` on the `SavedTaxReturns` table. All the data in the column will be lost.
  - You are about to drop the column `notes` on the `SavedTaxReturns` table. All the data in the column will be lost.
  - Added the required column `individualTaxes` to the `SavedTaxReturns` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "SavedTaxReturns_individualTaxesId_key";

-- AlterTable
ALTER TABLE "SavedTaxReturns" DROP COLUMN "individualTaxesId",
DROP COLUMN "lastSavedPage",
DROP COLUMN "notes",
ADD COLUMN     "individualTaxes" JSONB NOT NULL;
