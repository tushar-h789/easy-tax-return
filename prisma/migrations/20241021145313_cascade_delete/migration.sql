-- DropForeignKey
ALTER TABLE "IndividualTaxes" DROP CONSTRAINT "IndividualTaxes_userId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_individualTaxesId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_userId_fkey";

-- AddForeignKey
ALTER TABLE "IndividualTaxes" ADD CONSTRAINT "IndividualTaxes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_individualTaxesId_fkey" FOREIGN KEY ("individualTaxesId") REFERENCES "IndividualTaxes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
