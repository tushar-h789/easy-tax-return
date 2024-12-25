/*
  Warnings:

  - The values [NON_GOVERNMENT] on the enum `EmploymentType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "EmploymentType_new" AS ENUM ('GOVERNMENT', 'PRIVATE');
ALTER TYPE "EmploymentType" RENAME TO "EmploymentType_old";
ALTER TYPE "EmploymentType_new" RENAME TO "EmploymentType";
DROP TYPE "EmploymentType_old";
COMMIT;
