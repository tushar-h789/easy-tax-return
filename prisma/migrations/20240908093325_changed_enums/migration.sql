/*
  Warnings:

  - The values [DhakaChattogramCityCorporationArea,OtherCityCorporationArea,OtherArea] on the enum `MinimumTax` will be removed. If these variants are still used in the database, this will fail.
  - The values [Resident,NonResident] on the enum `ResidentialStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [None,GazettedWarWoundedFreedomFighter,Female,ThirdGender,DisabledPerson,Aged65OrMore] on the enum `SpecialBenefits` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "MinimumTax_new" AS ENUM ('DHAKA_CHATTOGRAM_CITY_CORPORATION_AREA', 'OTHER_CITY_CORPORATION_AREA', 'OTHER_AREA');
ALTER TABLE "IndividualTaxes" ALTER COLUMN "minimumTax" TYPE "MinimumTax_new" USING ("minimumTax"::text::"MinimumTax_new");
ALTER TYPE "MinimumTax" RENAME TO "MinimumTax_old";
ALTER TYPE "MinimumTax_new" RENAME TO "MinimumTax";
DROP TYPE "MinimumTax_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "ResidentialStatus_new" AS ENUM ('RESIDENT', 'NON_RESIDENT');
ALTER TABLE "IndividualTaxes" ALTER COLUMN "residentialStatus" TYPE "ResidentialStatus_new" USING ("residentialStatus"::text::"ResidentialStatus_new");
ALTER TYPE "ResidentialStatus" RENAME TO "ResidentialStatus_old";
ALTER TYPE "ResidentialStatus_new" RENAME TO "ResidentialStatus";
DROP TYPE "ResidentialStatus_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "SpecialBenefits_new" AS ENUM ('NONE', 'GAZETTED_WAR_WOUNDED_FREEDOM_FIGHTER', 'FEMALE', 'THIRD_GENDER', 'DISABLED_PERSON', 'AGED_65_OR_MORE');
ALTER TABLE "IndividualTaxes" ALTER COLUMN "specialBenefits" TYPE "SpecialBenefits_new" USING ("specialBenefits"::text::"SpecialBenefits_new");
ALTER TYPE "SpecialBenefits" RENAME TO "SpecialBenefits_old";
ALTER TYPE "SpecialBenefits_new" RENAME TO "SpecialBenefits";
DROP TYPE "SpecialBenefits_old";
COMMIT;
