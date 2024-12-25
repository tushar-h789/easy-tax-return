"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { generateInvoicePDF } from "@/lib/pdf";
import InvoiceImage from "@/public/images/invoice.jpeg";
import { Order, IndividualTaxes } from "@prisma/client";

interface InvoiceDownloadButtonProps {
  orderId: string;
  invoiceId: string;
  paymentStatus: string;
  taxReturnOrder: Order & {
    individualTaxes: IndividualTaxes | null;
  };
}

export default function InvoiceDownloadButton({
  orderId,
  invoiceId,
  paymentStatus,
  taxReturnOrder,
}: InvoiceDownloadButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleDownload = async () => {
    if (!taxReturnOrder.individualTaxes) {
      toast({
        title: "Error",
        description: "Tax return data not found",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      await generateInvoicePDF(InvoiceImage.src, {
        taxpayerName: taxReturnOrder.individualTaxes.taxpayerName,
        invoiceId: taxReturnOrder.invoiceId,
        tin: taxReturnOrder.individualTaxes.tin,
        mobile: taxReturnOrder.individualTaxes.mobile,
        createdAt: taxReturnOrder.createdAt,
      });

      toast({
        title: "Success",
        description: "Invoice downloaded successfully",
        variant: "success",
      });
    } catch (error) {
      console.error("Error downloading invoice:", error);
      toast({
        title: "Error",
        description: "Failed to download invoice. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleDownload}
      disabled={isLoading || paymentStatus !== "PAID"}
      className="gap-2"
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Download className="h-4 w-4" />
      )}
      {isLoading ? "Downloading..." : "Download Invoice"}
    </Button>
  );
}
