// app/profile/submitted/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import UserSubmittedTaxReturns from "./_components/user-submitted-tax-returns";
import { Suspense } from "react";
import TaxReturnsLoadingSkeleton from "./_components/tax-returns-loading-skeleton";

const ITEMS_PER_PAGE = 6;

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

async function getSubmittedTaxReturns(page: number) {
  try {
    const session = await getServerSession(authOptions);

    const skip = (page - 1) * ITEMS_PER_PAGE;

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where: {
          userId: session?.user.id,
        },
        include: {
          user: true,
          individualTaxes: true,
        },
        orderBy: {
          createdAt: "desc",
        },
        take: ITEMS_PER_PAGE,
        skip,
      }),
      prisma.order.count({
        where: {
          userId: session?.user.id,
        },
      }),
    ]);

    return {
      orders,
      totalPages: Math.ceil(total / ITEMS_PER_PAGE),
      currentPage: page,
    };
  } catch (error) {
    console.error("Error fetching tax returns:", error);
    return {
      orders: [],
      totalPages: 0,
      currentPage: 1,
    };
  }
}

export default async function UserSubmittedTaxReturnsPage({
  searchParams,
}: PageProps) {
  const currentPage = Number(searchParams.page) || 1;
  const {
    orders,
    totalPages,
    currentPage: validatedPage,
  } = await getSubmittedTaxReturns(currentPage);

  return (
    <Suspense fallback={<TaxReturnsLoadingSkeleton />}>
      <UserSubmittedTaxReturns
        taxReturns={orders}
        totalPages={totalPages}
        currentPage={validatedPage}
      />
    </Suspense>
  );
}
