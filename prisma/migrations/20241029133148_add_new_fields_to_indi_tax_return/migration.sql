/*
  Warnings:

  - You are about to drop the column `contributionToZakatFund1` on the `IndividualTaxes` table. All the data in the column will be lost.
  - You are about to drop the column `contributionToZakatFund2` on the `IndividualTaxes` table. All the data in the column will be lost.
  - You are about to drop the column `dividendIncomeAmount` on the `IndividualTaxes` table. All the data in the column will be lost.
  - You are about to drop the column `dividendIncomeDeductions` on the `IndividualTaxes` table. All the data in the column will be lost.
  - You are about to drop the column `dividendIncomeTax` on the `IndividualTaxes` table. All the data in the column will be lost.
  - You are about to drop the column `incomeFishFarming` on the `IndividualTaxes` table. All the data in the column will be lost.
  - You are about to drop the column `incomeFishFarmingAmount` on the `IndividualTaxes` table. All the data in the column will be lost.
  - You are about to drop the column `incomeFromBusinessAmount` on the `IndividualTaxes` table. All the data in the column will be lost.
  - You are about to drop the column `incomeFromBusinessDeductions` on the `IndividualTaxes` table. All the data in the column will be lost.
  - You are about to drop the column `incomeFromBusinessMinimum` on the `IndividualTaxes` table. All the data in the column will be lost.
  - You are about to drop the column `incomeFromBusinessTax` on the `IndividualTaxes` table. All the data in the column will be lost.
  - You are about to drop the column `incomeFromFinancialProductSchemeAmount` on the `IndividualTaxes` table. All the data in the column will be lost.
  - You are about to drop the column `incomeFromFinancialProductSchemeDeductions` on the `IndividualTaxes` table. All the data in the column will be lost.
  - You are about to drop the column `incomeFromFinancialProductSchemeTax` on the `IndividualTaxes` table. All the data in the column will be lost.
  - You are about to drop the column `incomeFromOtherSourcesAmount` on the `IndividualTaxes` table. All the data in the column will be lost.
  - You are about to drop the column `incomeFromOtherSourcesDeductions` on the `IndividualTaxes` table. All the data in the column will be lost.
  - You are about to drop the column `incomeFromOtherSourcesTax` on the `IndividualTaxes` table. All the data in the column will be lost.
  - You are about to drop the column `investmentInGovernmentSecurities1` on the `IndividualTaxes` table. All the data in the column will be lost.
  - You are about to drop the column `investmentInGovernmentSecurities2` on the `IndividualTaxes` table. All the data in the column will be lost.
  - You are about to drop the column `investmentInSecurities` on the `IndividualTaxes` table. All the data in the column will be lost.
  - You are about to drop the column `othersIf1` on the `IndividualTaxes` table. All the data in the column will be lost.
  - You are about to drop the column `othersIf2` on the `IndividualTaxes` table. All the data in the column will be lost.
  - You are about to drop the column `partnersInfo` on the `IndividualTaxes` table. All the data in the column will be lost.
  - You are about to drop the column `workersParticipationFundAmount` on the `IndividualTaxes` table. All the data in the column will be lost.
  - You are about to drop the column `workersParticipationFundDeductions` on the `IndividualTaxes` table. All the data in the column will be lost.
  - You are about to drop the column `workersParticipationFundTax` on the `IndividualTaxes` table. All the data in the column will be lost.
  - Added the required column `assesseeStatus` to the `IndividualTaxes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `assessmentYear` to the `IndividualTaxes` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AssesseeStatus" AS ENUM ('INDIVIDUAL', 'FIRM', 'HINDU_UNDEVIDED_FAMILY', 'OTHERS');

-- AlterTable
ALTER TABLE "IndividualTaxes" DROP COLUMN "contributionToZakatFund1",
DROP COLUMN "contributionToZakatFund2",
DROP COLUMN "dividendIncomeAmount",
DROP COLUMN "dividendIncomeDeductions",
DROP COLUMN "dividendIncomeTax",
DROP COLUMN "incomeFishFarming",
DROP COLUMN "incomeFishFarmingAmount",
DROP COLUMN "incomeFromBusinessAmount",
DROP COLUMN "incomeFromBusinessDeductions",
DROP COLUMN "incomeFromBusinessMinimum",
DROP COLUMN "incomeFromBusinessTax",
DROP COLUMN "incomeFromFinancialProductSchemeAmount",
DROP COLUMN "incomeFromFinancialProductSchemeDeductions",
DROP COLUMN "incomeFromFinancialProductSchemeTax",
DROP COLUMN "incomeFromOtherSourcesAmount",
DROP COLUMN "incomeFromOtherSourcesDeductions",
DROP COLUMN "incomeFromOtherSourcesTax",
DROP COLUMN "investmentInGovernmentSecurities1",
DROP COLUMN "investmentInGovernmentSecurities2",
DROP COLUMN "investmentInSecurities",
DROP COLUMN "othersIf1",
DROP COLUMN "othersIf2",
DROP COLUMN "partnersInfo",
DROP COLUMN "workersParticipationFundAmount",
DROP COLUMN "workersParticipationFundDeductions",
DROP COLUMN "workersParticipationFundTax",
ADD COLUMN     "assesseeStatus" "AssesseeStatus" NOT NULL,
ADD COLUMN     "assessmentYear" TEXT NOT NULL;
