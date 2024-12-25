import { PaymentStatus } from "@prisma/client";
import { z } from "zod";

// Form schema
export const orderUpdateSchema = z.object({
  paymentStatus: z.nativeEnum(PaymentStatus),
  transactionID: z.string().min(1, "Transaction ID is required"),
  phoneNumberUsed: z.string().optional(),
});

export type OrderUpdateForm = z.infer<typeof orderUpdateSchema>;
