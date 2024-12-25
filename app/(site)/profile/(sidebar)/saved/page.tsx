import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { Suspense } from "react";
import UserSavedTaxReturns from "./_components/user-saved-tax-returns";
import TaxReturnsLoadingSkeleton from "./_components/tax-returns-loading-skeleton";

const ITEMS_PER_PAGE = 6;

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

async function getSavedTaxReturns(page: number) {
  try {
    const session = await getServerSession(authOptions);

    const skip = (page - 1) * ITEMS_PER_PAGE;

    const [savedReturns, total] = await Promise.all([
      prisma.savedTaxReturns.findMany({
        where: {
          userId: session?.user.id,
        },
        orderBy: {
          updatedAt: "desc",
        },
        take: ITEMS_PER_PAGE,
        skip,
      }),
      prisma.savedTaxReturns.count({
        where: {
          userId: session?.user.id,
        },
      }),
    ]);

    return {
      savedReturns,
      totalPages: Math.ceil(total / ITEMS_PER_PAGE),
      currentPage: page,
    };
  } catch (error) {
    console.error("Error fetching saved tax returns:", error);
    return {
      savedReturns: [],
      totalPages: 0,
      currentPage: 1,
    };
  }
}

export default async function SavedTaxReturnsPage({ searchParams }: PageProps) {
  const currentPage = Number(searchParams.page) || 1;
  const {
    savedReturns,
    totalPages,
    currentPage: validatedPage,
  } = await getSavedTaxReturns(currentPage);

  return (
    <Suspense fallback={<TaxReturnsLoadingSkeleton />}>
      <UserSavedTaxReturns
        savedReturns={savedReturns}
        totalPages={totalPages}
        currentPage={validatedPage}
      />
    </Suspense>
  );
}
