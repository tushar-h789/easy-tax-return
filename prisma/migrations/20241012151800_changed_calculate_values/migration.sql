/*
  Warnings:

  - The values [Calculate,ReCalculate] on the enum `CalculationType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "CalculationType_new" AS ENUM ('CALCULATE', 'RECALCULATE');
ALTER TABLE "IndividualTaxes" ALTER COLUMN "calculate" TYPE "CalculationType_new" USING ("calculate"::text::"CalculationType_new");
ALTER TYPE "CalculationType" RENAME TO "CalculationType_old";
ALTER TYPE "CalculationType_new" RENAME TO "CalculationType";
DROP TYPE "CalculationType_old";
COMMIT;
