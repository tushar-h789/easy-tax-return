/*
  Warnings:

  - You are about to drop the `Payment` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId]` on the table `IndividualTaxes` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('BKASH', 'NAGAD', 'UPAY', 'SURECASH', 'MKASH', 'ROCKET', 'BANK_TRANSFER', 'OTHERS');

-- DropTable
DROP TABLE "Payment";

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "individualTaxesId" TEXT,
    "amount" DOUBLE PRECISION,
    "paymentMethod" "PaymentMethod",
    "transactionID" TEXT,
    "paymentID" TEXT,
    "date" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Order_individualTaxesId_key" ON "Order"("individualTaxesId");

-- CreateIndex
CREATE UNIQUE INDEX "IndividualTaxes_userId_key" ON "IndividualTaxes"("userId");

-- AddForeignKey
ALTER TABLE "IndividualTaxes" ADD CONSTRAINT "IndividualTaxes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_individualTaxesId_fkey" FOREIGN KEY ("individualTaxesId") REFERENCES "IndividualTaxes"("id") ON DELETE SET NULL ON UPDATE CASCADE;
