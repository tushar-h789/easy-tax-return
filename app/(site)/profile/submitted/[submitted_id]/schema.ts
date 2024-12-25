import { z } from "zod";

export const confirmPaymentSchema = z.object({
  phoneNumberUsed: z
    .string()
    .min(11, "Phone number must be 11 digits")
    .max(11, "Phone number must be 11 digits")
    .regex(/^01[3-9]\d{8}$/, "Must be a valid Bangladeshi phone number"),
  transactionID: z
    .string()
    .min(10, "Transaction ID must be at least 10 characters")
    .max(30, "Transaction ID cannot exceed 30 characters")
    .regex(
      /^[A-Za-z0-9]+$/,
      "Transaction ID can only contain letters and numbers"
    ),
});

export type ConfirmPaymentInput = z.infer<typeof confirmPaymentSchema>;
