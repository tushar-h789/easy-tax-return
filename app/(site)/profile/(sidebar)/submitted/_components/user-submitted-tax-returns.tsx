"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Calendar, ArrowRight, Receipt } from "lucide-react";
import Link from "next/link";
import { Order, User, IndividualTaxes } from "@prisma/client";
import Pagination from "@/components/custom/pagination";

interface TaxReturn extends Order {
  user: User;
  individualTaxes: IndividualTaxes | null;
}

interface UserSubmittedTaxReturnsProps {
  taxReturns: TaxReturn[];
  totalPages: number;
  currentPage: number;
}

const formatDate = (date: Date) => {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};

const getPaymentStatusColor = (status: string) => {
  switch (status) {
    case "PAID":
      return "bg-green-500";
    case "PENDING":
      return "bg-yellow-500";
    case "CANCELLED":
      return "bg-red-500";
    case "EXPIRED":
      return "bg-gray-500";
    default:
      return "bg-gray-500";
  }
};

const formatPaymentMethod = (method: string | null) => {
  if (!method) return "N/A";
  return (
    method.charAt(0).toUpperCase() +
    method.slice(1).toLowerCase().replace("_", " ")
  );
};

export default function UserSubmittedTaxReturns({
  taxReturns,
  totalPages,
  currentPage,
}: UserSubmittedTaxReturnsProps) {
  return (
    <div className="container mx-auto min-h-[500px]">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-primary">
          Submitted Tax Returns
        </h1>
      </div>

      {taxReturns.length === 0 ? (
        <Card className="bg-muted">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <FileText className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-xl font-medium text-muted-foreground mb-2">
              No submitted returns found
            </p>
            <p className="text-sm text-muted-foreground mb-4">
              Submit a tax return to see it here
            </p>
            <Button asChild>
              <Link href="/individual-tax-return">Start New Return</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {taxReturns.map((taxReturn) => (
              <Link
                href={`/profile/submitted/${taxReturn.id}`}
                key={taxReturn.id}
                className="block group"
              >
                <Card className="h-full transition-all duration-200 hover:shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      <span>
                        TIN: {taxReturn.individualTaxes?.tin || "N/A"}
                      </span>
                    </CardTitle>
                  </CardHeader>

                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>
                          Assessment Year:{" "}
                          {taxReturn.individualTaxes?.assessmentYear || "N/A"}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Receipt className="h-4 w-4 text-muted-foreground" />
                        <div className="flex gap-2 items-center">
                          <span className="text-sm text-muted-foreground">
                            {formatPaymentMethod(taxReturn.paymentMethod)}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            ({taxReturn.transactionID || "No transaction ID"})
                          </span>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-2 h-2 rounded-full ${getPaymentStatusColor(
                              taxReturn.paymentStatus
                            )}`}
                          />
                          <span className="text-sm capitalize">
                            {taxReturn.paymentStatus.toLowerCase()}
                          </span>
                        </div>
                        <ArrowRight className="h-5 w-5 text-primary transition-transform group-hover:translate-x-1" />
                      </div>

                      <div className="text-sm text-muted-foreground">
                        Submitted on: {formatDate(taxReturn.createdAt)}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {totalPages > 1 && (
            <Pagination totalPages={totalPages} currentPage={currentPage} />
          )}
        </>
      )}
    </div>
  );
}
