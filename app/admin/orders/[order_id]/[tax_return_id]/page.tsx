import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import prisma from "@/lib/prisma";
import { ChevronRight, Home } from "lucide-react";
import IndividualTaxReturnForm from "@/app/(site)/individual-tax-return/_components/individual-tax-return-form";
import { Suspense } from "react";

interface AdminTaxReturnDetailsFormPageProps {
  params: {
    order_id: string;
  };
}

export const metadata: Metadata = {
  title: "Tax Return Details",
  description: "View and modify tax return details",
};

async function getOrderDetails(orderId: string) {
  try {
    const order = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
      include: {
        individualTaxes: {
          include: {
            // Include all relations required for the form
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
      return null;
    }

    return order;
  } catch (error) {
    console.error("Error fetching order details:", error);
    return null;
  }
}

export default async function AdminTaxReturnDetailsFormPage({
  params,
}: AdminTaxReturnDetailsFormPageProps) {
  const order = await getOrderDetails(params.order_id);

  if (!order) {
    notFound();
  }

  return (
    <div className="container mx-auto py-10">
      {/* Breadcrumb Navigation */}
      <nav className="flex mb-8 items-center text-sm text-gray-600">
        <Link
          href="/admin"
          className="flex items-center hover:text-primary transition-colors"
        >
          <Home className="h-4 w-4 mr-2" />
          Dashboard
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <Link
          href="/admin/orders"
          className="hover:text-primary transition-colors"
        >
          Orders
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <Link
          href={`/admin/orders/${order.id}`}
          className="hover:text-primary transition-colors"
        >
          {order.invoiceId}
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <span className="text-gray-900">Tax Return</span>
      </nav>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Tax Return Details</h1>
        <p className="mt-2 text-gray-600">Invoice ID: {order.invoiceId}</p>
      </div>

      <Suspense>
        <IndividualTaxReturnForm taxReturnOrder={order} />
      </Suspense>
    </div>
  );
}
