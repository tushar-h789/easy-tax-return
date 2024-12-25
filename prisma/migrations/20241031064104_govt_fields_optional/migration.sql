-- DropForeignKey
ALTER TABLE "IndividualTaxes" DROP CONSTRAINT "IndividualTaxes_allowanceForSupportStaffGovtId_fkey";

-- DropForeignKey
ALTER TABLE "IndividualTaxes" DROP CONSTRAINT "IndividualTaxes_arrearPayGovtId_fkey";

-- DropForeignKey
ALTER TABLE "IndividualTaxes" DROP CONSTRAINT "IndividualTaxes_banglaNoboborshoAllowancesGovtId_fkey";

-- DropForeignKey
ALTER TABLE "IndividualTaxes" DROP CONSTRAINT "IndividualTaxes_basicPayGovtId_fkey";

-- DropForeignKey
ALTER TABLE "IndividualTaxes" DROP CONSTRAINT "IndividualTaxes_conveyanceAllowanceGovtId_fkey";

-- DropForeignKey
ALTER TABLE "IndividualTaxes" DROP CONSTRAINT "IndividualTaxes_festivalAllowanceGovtId_fkey";

-- DropForeignKey
ALTER TABLE "IndividualTaxes" DROP CONSTRAINT "IndividualTaxes_gratuityGovtId_fkey";

-- DropForeignKey
ALTER TABLE "IndividualTaxes" DROP CONSTRAINT "IndividualTaxes_honorariumRewardGovtId_fkey";

-- DropForeignKey
ALTER TABLE "IndividualTaxes" DROP CONSTRAINT "IndividualTaxes_houseRentAllowanceGovtId_fkey";

-- DropForeignKey
ALTER TABLE "IndividualTaxes" DROP CONSTRAINT "IndividualTaxes_interestAccruedProvidentFundGovtId_fkey";

-- DropForeignKey
ALTER TABLE "IndividualTaxes" DROP CONSTRAINT "IndividualTaxes_leaveAllowanceGovtId_fkey";

-- DropForeignKey
ALTER TABLE "IndividualTaxes" DROP CONSTRAINT "IndividualTaxes_lumpGrantGovtId_fkey";

-- DropForeignKey
ALTER TABLE "IndividualTaxes" DROP CONSTRAINT "IndividualTaxes_medicalAllowanceGovtId_fkey";

-- DropForeignKey
ALTER TABLE "IndividualTaxes" DROP CONSTRAINT "IndividualTaxes_otherAllowanceGovtId_fkey";

-- DropForeignKey
ALTER TABLE "IndividualTaxes" DROP CONSTRAINT "IndividualTaxes_overtimeAllowanceGovtId_fkey";

-- DropForeignKey
ALTER TABLE "IndividualTaxes" DROP CONSTRAINT "IndividualTaxes_specialAllowanceGovtId_fkey";

-- DropForeignKey
ALTER TABLE "IndividualTaxes" DROP CONSTRAINT "IndividualTaxes_totalGovtId_fkey";

-- AlterTable
ALTER TABLE "IndividualTaxes" ALTER COLUMN "minimumTax" DROP NOT NULL,
ALTER COLUMN "fatherOrHusband" DROP NOT NULL,
ALTER COLUMN "allowanceForSupportStaffGovtId" DROP NOT NULL,
ALTER COLUMN "arrearPayGovtId" DROP NOT NULL,
ALTER COLUMN "banglaNoboborshoAllowancesGovtId" DROP NOT NULL,
ALTER COLUMN "basicPayGovtId" DROP NOT NULL,
ALTER COLUMN "conveyanceAllowanceGovtId" DROP NOT NULL,
ALTER COLUMN "festivalAllowanceGovtId" DROP NOT NULL,
ALTER COLUMN "gratuityGovtId" DROP NOT NULL,
ALTER COLUMN "honorariumRewardGovtId" DROP NOT NULL,
ALTER COLUMN "houseRentAllowanceGovtId" DROP NOT NULL,
ALTER COLUMN "interestAccruedProvidentFundGovtId" DROP NOT NULL,
ALTER COLUMN "leaveAllowanceGovtId" DROP NOT NULL,
ALTER COLUMN "lumpGrantGovtId" DROP NOT NULL,
ALTER COLUMN "medicalAllowanceGovtId" DROP NOT NULL,
ALTER COLUMN "otherAllowanceGovtId" DROP NOT NULL,
ALTER COLUMN "overtimeAllowanceGovtId" DROP NOT NULL,
ALTER COLUMN "specialAllowanceGovtId" DROP NOT NULL,
ALTER COLUMN "totalGovtId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "IndividualTaxes" ADD CONSTRAINT "IndividualTaxes_basicPayGovtId_fkey" FOREIGN KEY ("basicPayGovtId") REFERENCES "GovtPayScale"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IndividualTaxes" ADD CONSTRAINT "IndividualTaxes_arrearPayGovtId_fkey" FOREIGN KEY ("arrearPayGovtId") REFERENCES "GovtPayScale"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IndividualTaxes" ADD CONSTRAINT "IndividualTaxes_specialAllowanceGovtId_fkey" FOREIGN KEY ("specialAllowanceGovtId") REFERENCES "GovtPayScale"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IndividualTaxes" ADD CONSTRAINT "IndividualTaxes_houseRentAllowanceGovtId_fkey" FOREIGN KEY ("houseRentAllowanceGovtId") REFERENCES "GovtPayScale"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IndividualTaxes" ADD CONSTRAINT "IndividualTaxes_medicalAllowanceGovtId_fkey" FOREIGN KEY ("medicalAllowanceGovtId") REFERENCES "GovtPayScale"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IndividualTaxes" ADD CONSTRAINT "IndividualTaxes_conveyanceAllowanceGovtId_fkey" FOREIGN KEY ("conveyanceAllowanceGovtId") REFERENCES "GovtPayScale"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IndividualTaxes" ADD CONSTRAINT "IndividualTaxes_festivalAllowanceGovtId_fkey" FOREIGN KEY ("festivalAllowanceGovtId") REFERENCES "GovtPayScale"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IndividualTaxes" ADD CONSTRAINT "IndividualTaxes_allowanceForSupportStaffGovtId_fkey" FOREIGN KEY ("allowanceForSupportStaffGovtId") REFERENCES "GovtPayScale"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IndividualTaxes" ADD CONSTRAINT "IndividualTaxes_leaveAllowanceGovtId_fkey" FOREIGN KEY ("leaveAllowanceGovtId") REFERENCES "GovtPayScale"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IndividualTaxes" ADD CONSTRAINT "IndividualTaxes_honorariumRewardGovtId_fkey" FOREIGN KEY ("honorariumRewardGovtId") REFERENCES "GovtPayScale"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IndividualTaxes" ADD CONSTRAINT "IndividualTaxes_overtimeAllowanceGovtId_fkey" FOREIGN KEY ("overtimeAllowanceGovtId") REFERENCES "GovtPayScale"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IndividualTaxes" ADD CONSTRAINT "IndividualTaxes_banglaNoboborshoAllowancesGovtId_fkey" FOREIGN KEY ("banglaNoboborshoAllowancesGovtId") REFERENCES "GovtPayScale"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IndividualTaxes" ADD CONSTRAINT "IndividualTaxes_interestAccruedProvidentFundGovtId_fkey" FOREIGN KEY ("interestAccruedProvidentFundGovtId") REFERENCES "GovtPayScale"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IndividualTaxes" ADD CONSTRAINT "IndividualTaxes_lumpGrantGovtId_fkey" FOREIGN KEY ("lumpGrantGovtId") REFERENCES "GovtPayScale"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IndividualTaxes" ADD CONSTRAINT "IndividualTaxes_gratuityGovtId_fkey" FOREIGN KEY ("gratuityGovtId") REFERENCES "GovtPayScale"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IndividualTaxes" ADD CONSTRAINT "IndividualTaxes_otherAllowanceGovtId_fkey" FOREIGN KEY ("otherAllowanceGovtId") REFERENCES "GovtPayScale"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IndividualTaxes" ADD CONSTRAINT "IndividualTaxes_totalGovtId_fkey" FOREIGN KEY ("totalGovtId") REFERENCES "GovtPayScale"("id") ON DELETE SET NULL ON UPDATE CASCADE;
