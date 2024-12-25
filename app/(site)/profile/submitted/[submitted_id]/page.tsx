import React, { Suspense } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import IndividualTaxReturnForm from "@/app/(site)/individual-tax-return/_components/individual-tax-return-form";
import DynamicBreadcrumb from "@/components/custom/dynamic-breadcrumb";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Download, FileX } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import PaymentConfirmation from "./_components/payment-confirmation";
import InvoiceDownloadButton from "./_components/invoice-download-button";

interface PageProps {
  params: {
    submitted_id: string;
  };
}

async function getOrderDetails(orderId: string) {
  try {
    const session = await getServerSession(authOptions);

    const order = await prisma.order.findUnique({
      where: {
        id: orderId,
        userId: session?.user.id,
      },
      include: {
        individualTaxes: {
          include: {
            basicPayGovt: true,
            arrearPayGovt: true,
            specialAllowanceGovt: true,
            houseRentAllowanceGovt: true,
            medicalAllowanceGovt: true,
            conveyanceAllowanceGovt: true,
            festivalAllowanceGovt: true,
            allowanceForSupportStaffGovt: true,
            leaveAllowanceGovt: true,
            honorariumRewardGovt: true,
            overtimeAllowanceGovt: true,
            banglaNoboborshoAllowancesGovt: true,
            interestAccruedProvidentFundGovt: true,
            lumpGrantGovt: true,
            gratuityGovt: true,
            otherAllowanceGovt: true,
            totalGovt: true,
            incomeFromShareTransferListedCompany: true,
            incomeFromCapitalGain2: true,
            incomeFromCapitalGain3: true,
            incomeFromCapitalGain4: true,
            incomeFromCapitalGain5: true,
            incomeFromCapitalGainsTotal: true,

            shonchoyparta: true,
            profitFromShoychoyparta2: true,
            profitFromShoychoyparta3: true,
            profitFromShoychoyparta4: true,
            profitFromShoychoyparta5: true,
            profitFromShoychoyparta6: true,
            profitFromShoychoyparta7: true,
            profitFromShoychoyparta8: true,
            profitFromShoychoyparta9: true,
            profitFromShoychoyparta10: true,
            profitFromShoychoypartaTotal: true,

            interestFromSecurities: true,
            profitInterestFromGovtSecurities2: true,
            profitInterestFromGovtSecurities3: true,
            profitInterestFromGovtSecurities4: true,
            profitInterestFromGovtSecurities5: true,
            profitInterestFromGovtSecurities6: true,
            profitInterestFromGovtSecurities7: true,
            profitInterestFromGovtSecurities8: true,
            profitInterestFromGovtSecurities9: true,
            profitInterestFromGovtSecurities10: true,
            profitInterestFromGovtSecuritiesTotal: true,

            // Image 9
            expensesForFood: true,
            housingExpense: true,
            personalTransportationExpenses: true,
            utilityExpense: true,
            houseKeepingExpense: true,
            humanitiesExpense: true,
            educationExpenses: true,
            personalExpenseForLocalForeignTravel: true,
            festivalExpense: true,
            taxDeductedCollectedAtSource: true,
            interestPaid: true,
            totalExpenseIndividualPerson: true,
          },
        },
      },
    });

    if (!order) {
      redirect("/profile/submitted");
    }

    return order;
  } catch (error) {
    console.error("[ORDER_GET]", error);
    throw new Error("Failed to fetch order");
  }
}

function NoDataState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 bg-white rounded-lg shadow">
      <FileX className="h-16 w-16 text-gray-400 mb-4" />
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        No Tax Return Data Available
      </h3>
      <p className="text-gray-500 text-center mb-6 max-w-md">
        The tax return data for this order is not available. This might be
        because the form submission is still in progress or there was an error
        during submission.
      </p>
      <div className="flex gap-4">
        <Button asChild variant="outline">
          <Link href="/profile/submitted">Back to Submissions</Link>
        </Button>
        <Button asChild>
          <Link href="/individual-tax-return">Submit New Return</Link>
        </Button>
      </div>
    </div>
  );
}

export default async function UserSubmittedTaxReturnDetails({
  params,
}: PageProps) {
  const order = await getOrderDetails(params.submitted_id);

  // Guard clause - if no order data, render the NoDataState
  if (!order) {
    return (
      <div className="bg-lightGray min-h-screen">
        <div className="container mx-auto px-4 md:px-8 py-8">
          <div className="mb-8">
            <DynamicBreadcrumb
              items={[
                { label: "Profile", href: "/profile" },
                { label: "Submitted Tax Returns", href: "/profile/submitted" },
                { label: "Return Details", isCurrentPage: true },
              ]}
            />
          </div>
          <NoDataState />
        </div>
      </div>
    );
  }

  const breadcrumbItems = [
    { label: "Profile", href: "/profile" },
    { label: "Submitted Tax Returns", href: "/profile/submitted" },
    { label: "Return Details", isCurrentPage: true },
  ];

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="bg-lightGray min-h-screen">
      <div className="container mx-auto px-4 md:px-8 py-8">
        {/* Breadcrumb */}
        <div className="mb-8">
          <DynamicBreadcrumb items={breadcrumbItems} />
        </div>

        {order.paymentStatus === "PENDING" ? (
          <PaymentConfirmation taxReturnOrder={order} />
        ) : (
          <>
            {/* Header Section */}
            <div className="mb-8">
              <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4 md:mb-0 font-serif text-center md:text-left">
                  Tax Return Details
                </h1>
                <InvoiceDownloadButton
                  orderId={params.submitted_id}
                  invoiceId={order.invoiceId}
                  paymentStatus={order.paymentStatus}
                  taxReturnOrder={order}
                />
              </div>
              <p className="text-gray-700 mb-8 text-center md:text-left max-w-2xl">
                Review your submitted tax return information and download
                related documents.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Transaction ID
                      </p>
                      <p className="text-lg font-semibold">
                        {order.transactionID || "N/A"}
                      </p>
                    </div>
                    <Badge
                      variant={
                        order.paymentStatus === "PAID"
                          ? "default"
                          : "destructive"
                      }
                      className="uppercase"
                    >
                      {order.paymentStatus}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-500">TIN</p>
                    <p className="text-lg font-semibold">
                      {order.individualTaxes?.tin || "Not available"}
                    </p>
                    <p className="text-sm text-gray-500">
                      Submitted on {formatDate(order.createdAt)}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-500">
                      Payment Details
                    </p>
                    <p className="text-lg font-semibold">
                      ৳ {order.amount?.toLocaleString() || "0"}
                    </p>
                    <p className="text-sm text-gray-500">
                      {order.paymentMethod
                        ? `Paid via ${order.paymentMethod}`
                        : "Payment method not specified"}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </>
        )}

        {/* Form Container */}
        {order.individualTaxes ? (
          <Suspense>
            <IndividualTaxReturnForm taxReturnOrder={order} />
          </Suspense>
        ) : (
          <NoDataState />
        )}
      </div>
    </div>
  );
}
