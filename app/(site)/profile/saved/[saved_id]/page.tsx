import React, { Suspense } from "react";
import { FileX } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import IndividualTaxReturnForm from "@/app/(site)/individual-tax-return/_components/individual-tax-return-form";
import DynamicBreadcrumb from "@/components/custom/dynamic-breadcrumb";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

interface PageProps {
  params: {
    saved_id: string;
  };
}

async function getSavedTaxReturn(savedId: string) {
  try {
    const session = await getServerSession(authOptions);

    const savedReturn = await prisma.savedTaxReturns.findUnique({
      where: {
        id: savedId,
        userId: session?.user.id,
      },
    });

    if (!savedReturn) {
      redirect("/profile/saved");
    }

    return savedReturn;
  } catch (error) {
    console.error("[SAVED_RETURN_GET]", error);
    throw new Error("Failed to fetch saved tax return");
  }
}

function NoDataState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 bg-white rounded-lg shadow">
      <FileX className="h-16 w-16 text-gray-400 mb-4" />
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        No Saved Tax Return Data Available
      </h3>
      <p className="text-gray-500 text-center mb-6 max-w-md">
        The saved tax return data could not be found. This might be because it
        has been deleted or there was an error accessing it.
      </p>
      <div className="flex gap-4">
        <Button asChild variant="outline">
          <Link href="/profile/saved">Back to Saved Returns</Link>
        </Button>
        <Button asChild>
          <Link href="/individual-tax-return">Start New Return</Link>
        </Button>
      </div>
    </div>
  );
}

export default async function UserSavedTaxReturnDetails({ params }: PageProps) {
  const savedReturn = await getSavedTaxReturn(params.saved_id);

  if (!savedReturn) {
    return (
      <div className="bg-lightGray min-h-screen">
        <div className="container mx-auto py-8 px-4 md:px-8">
          <div className="mb-8">
            <DynamicBreadcrumb
              items={[
                { label: "Profile", href: "/profile" },
                { label: "Saved Tax Returns", href: "/profile/saved" },
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
    { label: "Saved Tax Returns", href: "/profile/saved" },
    { label: "Return Details", isCurrentPage: true },
  ];

  return (
    <div className="bg-lightGray min-h-screen">
      <div className="container mx-auto py-8 px-4 md:px-8">
        {/* Breadcrumb */}
        <div className="mb-8">
          <DynamicBreadcrumb items={breadcrumbItems} />
        </div>

        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4 md:mb-0 font-serif text-center md:text-left">
              Saved Tax Return
            </h1>
          </div>
          <p className="text-gray-700 mb-8 text-center md:text-left max-w-2xl">
            Continue working on your saved tax return. Your progress is
            automatically saved as you make changes.
          </p>
        </div>

        {/* Form Container */}
        {savedReturn.taxData ? (
          <Suspense>
            <IndividualTaxReturnForm savedTaxReturn={savedReturn} />
          </Suspense>
        ) : (
          <NoDataState />
        )}
      </div>
    </div>
  );
}
