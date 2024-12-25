/*
  Warnings:

  - You are about to drop the column `bondsGovernment` on the `IndividualTaxes` table. All the data in the column will be lost.
  - You are about to drop the column `calculate` on the `IndividualTaxes` table. All the data in the column will be lost.
  - You are about to drop the column `employerContributionToRecognizedProvidentFundPrivateEmployment` on the `IndividualTaxes` table. All the data in the column will be lost.
  - You are about to drop the column `otherIfAnyPrivateEmployment` on the `IndividualTaxes` table. All the data in the column will be lost.
  - You are about to drop the column `salesTurnoverReceipts` on the `IndividualTaxes` table. All the data in the column will be lost.
  - You are about to drop the column `taxDeductedSourceFromIncomeRent` on the `IndividualTaxes` table. All the data in the column will be lost.
  - The `netWealthSurcharge` column on the `IndividualTaxes` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "IndividualTaxes" DROP COLUMN "bondsGovernment",
DROP COLUMN "calculate",
DROP COLUMN "employerContributionToRecognizedProvidentFundPrivateEmployment",
DROP COLUMN "otherIfAnyPrivateEmployment",
DROP COLUMN "salesTurnoverReceipts",
DROP COLUMN "taxDeductedSourceFromIncomeRent",
ADD COLUMN     "employerContributionToProvidentFundPrivateEmployment" DOUBLE PRECISION,
ADD COLUMN     "otherIncomePrivateEmployment" DOUBLE PRECISION,
ADD COLUMN     "salesTurnoverReceiptsBusiness" TEXT,
DROP COLUMN "netWealthSurcharge",
ADD COLUMN     "netWealthSurcharge" DOUBLE PRECISION;

-- DropEnum
DROP TYPE "CalculationType";

-- DropEnum
DROP TYPE "NetWealthSurcharge";
