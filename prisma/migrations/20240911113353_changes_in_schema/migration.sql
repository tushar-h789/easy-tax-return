/*
  Warnings:

  - You are about to drop the column `incomeFromEmployment` on the `IndividualTaxes` table. All the data in the column will be lost.
  - You are about to drop the column `privateOrganization` on the `IndividualTaxes` table. All the data in the column will be lost.
  - You are about to drop the column `taxDeductedSourceIncomeFromEmployment` on the `IndividualTaxes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "IndividualTaxes" DROP COLUMN "incomeFromEmployment",
DROP COLUMN "privateOrganization",
DROP COLUMN "taxDeductedSourceIncomeFromEmployment";
