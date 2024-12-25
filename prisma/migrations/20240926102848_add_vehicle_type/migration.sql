/*
  Warnings:

  - Added the required column `tranportFacilityPrivateVehicleCC` to the `IndividualTaxes` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TransportCCType" AS ENUM ('LT_EQ_2500', 'GT_2500');

-- AlterTable
ALTER TABLE "IndividualTaxes" ADD COLUMN     "tranportFacilityPrivateVehicleCC" "TransportCCType" NOT NULL;
