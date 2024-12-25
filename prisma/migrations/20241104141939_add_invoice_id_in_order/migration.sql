-- First, add the column as nullable
ALTER TABLE "Order" ADD COLUMN "invoiceId" TEXT;

-- Update existing records with generated invoice IDs
-- Using 'OLD-' prefix followed by the order ID as a simple way to handle existing records
UPDATE "Order" SET "invoiceId" = 'OLD-' || id WHERE "invoiceId" IS NULL;

-- Now make the column required
ALTER TABLE "Order" ALTER COLUMN "invoiceId" SET NOT NULL;

-- Add the unique constraint
CREATE UNIQUE INDEX "Order_invoiceId_key" ON "Order"("invoiceId");