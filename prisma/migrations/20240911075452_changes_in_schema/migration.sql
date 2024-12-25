/*
  Warnings:

  - Added the required column `calculate` to the `IndividualTaxes` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `netWealthSurcharge` on the `IndividualTaxes` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "NetWealthSurcharge" AS ENUM ('YES', 'NO');

-- CreateEnum
CREATE TYPE "CalculationType" AS ENUM ('Calculate', 'ReCalculate');

-- AlterTable
ALTER TABLE "IndividualTaxes" ADD COLUMN     "calculate" "CalculationType" NOT NULL,
DROP COLUMN "netWealthSurcharge",
ADD COLUMN     "netWealthSurcharge" "NetWealthSurcharge" NOT NULL;
