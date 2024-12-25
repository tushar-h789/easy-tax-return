/*
  Warnings:

  - You are about to drop the column `partnerName` on the `IndividualTaxes` table. All the data in the column will be lost.
  - You are about to drop the column `partnerTin` on the `IndividualTaxes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "IndividualTaxes" DROP COLUMN "partnerName",
DROP COLUMN "partnerTin";
