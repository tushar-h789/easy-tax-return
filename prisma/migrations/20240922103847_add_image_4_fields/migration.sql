/*
  Warnings:

  - Added the required column `isIncomeFromEmployment` to the `IndividualTaxes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `typeOfEmployment` to the `IndividualTaxes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "IndividualTaxes" ADD COLUMN     "incomeFromAgriculture" TEXT,
ADD COLUMN     "incomeFromBusiness" TEXT,
ADD COLUMN     "incomeFromBusinessMinimum" TEXT,
ADD COLUMN     "incomeFromCapitalGains" TEXT,
ADD COLUMN     "incomeFromEmployment" TEXT,
ADD COLUMN     "incomeFromRent" TEXT,
ADD COLUMN     "isIncomeFromEmployment" BOOLEAN NOT NULL,
ADD COLUMN     "typeOfEmployment" "EmploymentType" NOT NULL;
