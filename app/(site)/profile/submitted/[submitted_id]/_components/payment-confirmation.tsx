"use client";

import React, { useTransition, useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Smartphone, FileText, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import Image from "next/image";
import InvoiceImage from "@/public/images/invoice.jpeg";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ConfirmPaymentInput, confirmPaymentSchema } from "../schema";
import { confirmPayment } from "../../../actions";
import { Prisma } from "@prisma/client";

type OrderWithRelation = Prisma.OrderGetPayload<{
  include: {
    individualTaxes: true;
  };
}>;

const PaymentConfirmation = ({
  taxReturnOrder,
}: {
  taxReturnOrder: OrderWithRelation;
}) => {
  const [isPending, startTransition] = useTransition();
  const [formattedDate, setFormattedDate] = useState("");
  const hasExistingPaymentInfo = Boolean(
    taxReturnOrder.transactionID && taxReturnOrder.phoneNumberUsed
  );

  useEffect(() => {
    // Format date only on client side to avoid hydration mismatch
    const date = new Date(taxReturnOrder.createdAt);
    setFormattedDate(
      date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    );
  }, [taxReturnOrder.createdAt]);

  const form = useForm<ConfirmPaymentInput>({
    resolver: zodResolver(confirmPaymentSchema),
    defaultValues: {
      phoneNumberUsed: taxReturnOrder.phoneNumberUsed || "",
      transactionID: taxReturnOrder.transactionID || "",
    },
  });

  const { toast } = useToast();
  const router = useRouter();

  const onSubmit = (data: ConfirmPaymentInput) => {
    startTransition(async () => {
      const result = await confirmPayment(
        {
          phoneNumberUsed: data.phoneNumberUsed,
          transactionID: data.transactionID,
        },
        taxReturnOrder.id
      );

      if (result.success) {
        toast({
          title: "Payment Confirmed",
          description: "Your payment has been successfully confirmed.",
          variant: "success",
        });
        form.reset({
          phoneNumberUsed: data.phoneNumberUsed,
          transactionID: data.transactionID,
        });
        router.refresh();
      } else {
        toast({
          title: "Error",
          description:
            result.error || "Failed to confirm payment. Please try again.",
          variant: "destructive",
        });
      }
    });
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("en-BD", {
      style: "currency",
      currency: "BDT",
    }).format(amount);
  };

  const isDirty = form.formState.isDirty;

  return (
    <div className="max-w-5xl mx-auto px-4 space-y-6">
      {hasExistingPaymentInfo && (
        <Alert className="bg-blue-50 border-blue-200">
          <AlertCircle className="h-4 w-4 text-blue-600" />
          <AlertTitle className="text-blue-800">
            Payment Under Review
          </AlertTitle>
          <AlertDescription className="text-blue-700">
            We have received your payment information and it is currently under
            review. Our team will verify the transaction details and process
            your payment within 24-48 hours. You will be notified via email once
            the verification is complete. If you need to update your payment
            information, you can modify the details below and submit again.
          </AlertDescription>
        </Alert>
      )}

      <Card className="overflow-hidden">
        <CardHeader className="text-center border-b bg-primary/5">
          <CardTitle className="text-2xl font-serif text-primary">
            {hasExistingPaymentInfo
              ? "Payment Information"
              : "Scan QR Code to Pay"}
          </CardTitle>
          <p className="text-lg font-medium text-primary mt-2">
            Amount: {formatAmount(taxReturnOrder?.amount ?? 0)}
          </p>
        </CardHeader>

        <CardContent className="p-0">
          <div className="relative w-full h-[600px]">
            <Image
              src={InvoiceImage}
              alt="Invoice with QR Code"
              fill
              className="object-contain"
              priority
            />

            {/* Name */}
            <p className="absolute text-sm left-[9rem] top-[7.4rem]">
              {taxReturnOrder.individualTaxes?.taxpayerName || "N/A"}
            </p>

            {/* Order ID */}
            <p className="absolute text-sm left-[9rem] top-[9.2rem]">
              {taxReturnOrder.invoiceId || "N/A"}
            </p>

            {/* TIN */}
            <p className="absolute text-sm left-[9rem] top-[11.1rem]">
              {taxReturnOrder.individualTaxes?.tin || "N/A"}
            </p>

            {/* Mobile */}
            <p className="absolute text-sm left-[9rem] top-[12.9rem]">
              {taxReturnOrder.individualTaxes?.mobile || "N/A"}
            </p>

            {/* Date */}
            <p className="absolute text-sm left-[30rem] top-[7.5rem]">
              {formattedDate}
            </p>
          </div>

          <div className="px-8 py-6 border-t bg-white">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <div className="grid gap-8 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="phoneNumberUsed"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Smartphone className="h-4 w-4" />
                          bKash Number Used
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., 01XXXXXXXXX"
                            type="tel"
                            className="h-11"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="transactionID"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          Transaction ID
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your transaction ID"
                            className="h-11"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-6">
                  <Button
                    type="submit"
                    disabled={isPending || (hasExistingPaymentInfo && !isDirty)}
                    className="w-full h-11 text-base"
                  >
                    {isPending ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Confirming Payment...
                      </>
                    ) : hasExistingPaymentInfo ? (
                      "Update Payment Information"
                    ) : (
                      "Confirm Payment"
                    )}
                  </Button>

                  <p className="text-center text-sm text-muted-foreground">
                    {hasExistingPaymentInfo
                      ? "You can update your payment information if needed. The submit button will be enabled once you make changes."
                      : "After making the payment, please enter your bKash number and the transaction ID received via SMS to confirm your payment."}
                  </p>
                </div>
              </form>
            </Form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentConfirmation;
