/*
  Warnings:

  - You are about to drop the column `OthersIf1` on the `IndividualTaxes` table. All the data in the column will be lost.
  - You are about to drop the column `OthersIf2` on the `IndividualTaxes` table. All the data in the column will be lost.
  - Changed the type of `incomeFromEmployment` on the `IndividualTaxes` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "IncomeFromEmployment" AS ENUM ('YES', 'NO');

-- AlterTable
ALTER TABLE "IndividualTaxes" DROP COLUMN "OthersIf1",
DROP COLUMN "OthersIf2",
ADD COLUMN     "exemptedIncomeFromSalary" TEXT,
ADD COLUMN     "netWealthLastDateAmount" TEXT,
ADD COLUMN     "othersIf1" TEXT,
ADD COLUMN     "othersIf2" TEXT,
ADD COLUMN     "partnersInfo" TEXT,
ALTER COLUMN "dateOfBirth" SET DATA TYPE TEXT,
ALTER COLUMN "incomeYearEndedOn" SET DATA TYPE TEXT,
ALTER COLUMN "dateOfSignature" SET DATA TYPE TEXT,
DROP COLUMN "incomeFromEmployment",
ADD COLUMN     "incomeFromEmployment" "IncomeFromEmployment" NOT NULL;
