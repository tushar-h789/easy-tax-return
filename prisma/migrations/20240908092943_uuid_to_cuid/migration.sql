/*
  Warnings:

  - Added the required column `userId` to the `IndividualTaxes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "IndividualTaxes" ADD COLUMN     "userId" TEXT NOT NULL;
