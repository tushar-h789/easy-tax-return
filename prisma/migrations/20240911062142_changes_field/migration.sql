/*
  Warnings:

  - You are about to drop the column `SelfAndEmployersContribution` on the `IndividualTaxes` table. All the data in the column will be lost.
  - You are about to drop the column `TaxpayersShare` on the `IndividualTaxes` table. All the data in the column will be lost.
  - Added the required column `taxpayersShare` to the `IndividualTaxes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "IndividualTaxes" DROP COLUMN "SelfAndEmployersContribution",
DROP COLUMN "TaxpayersShare",
ADD COLUMN     "selfAndEmployersContribution" TEXT,
ADD COLUMN     "taxpayersShare" TEXT NOT NULL;
