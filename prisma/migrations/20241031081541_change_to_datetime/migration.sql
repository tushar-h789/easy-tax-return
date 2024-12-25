/*
  Warnings:

  - The `statementOfIncomeYearEndedOn` column on the `IndividualTaxes` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "IndividualTaxes" DROP COLUMN "statementOfIncomeYearEndedOn",
ADD COLUMN     "statementOfIncomeYearEndedOn" TIMESTAMP(3),
ALTER COLUMN "netWealthLastDate" DROP NOT NULL;
