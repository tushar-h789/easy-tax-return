/*
  Warnings:

  - Changed the type of `netWealthSurcharge` on the `IndividualTaxes` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `incomeFromEmployment` on the `IndividualTaxes` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "IndividualTaxes" DROP COLUMN "netWealthSurcharge",
ADD COLUMN     "netWealthSurcharge" BOOLEAN NOT NULL,
DROP COLUMN "incomeFromEmployment",
ADD COLUMN     "incomeFromEmployment" BOOLEAN NOT NULL;

-- DropEnum
DROP TYPE "YesNo";
