/*
  Warnings:

  - Made the column `fatherOrHusband` on table `IndividualTaxes` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "IndividualTaxes" ALTER COLUMN "fatherOrHusband" SET NOT NULL;
