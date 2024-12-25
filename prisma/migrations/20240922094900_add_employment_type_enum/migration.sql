/*
  Warnings:

  - You are about to drop the column `incomeYearEndedOn` on the `IndividualTaxes` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "EmploymentType" AS ENUM ('GOVERNMENT', 'NON_GOVERNMENT');

-- AlterTable
ALTER TABLE "IndividualTaxes" DROP COLUMN "incomeYearEndedOn";
