import { Suspense } from "react";
import { ContentLayout } from "../_components/content-layout";
import DynamicBreadcrumb from "../../../../components/custom/dynamic-breadcrumb";
import { Prisma } from "@prisma/client";
import { ReusablePagination } from "../_components/dynamic-pagination";
import prisma from "@/lib/prisma";
import UsersTableHeader from "./_components/users-table-header";
import UserList from "./_components/user-list";
import UsersLoading from "./_components/users-loading";

const breadcrumbItems = [
  { label: "Dashboard", href: "/admin" },
  { label: "Users", href: "/admin/users", isCurrentPage: true },
];

async function getUsers(
  page: number = 1,
  pageSize: number = 10,
  search?: string,
  sortBy?: string,
  sortOrder?: "asc" | "desc"
) {
  try {
    // Build where clause based on search and ensure we only get non-admin users
    const where: Prisma.UserWhereInput = {
      AND: [
        { role: "USER" }, // Only get regular users
        // Add search conditions if search parameter exists
        search
          ? {
              OR: [
                { name: { contains: search, mode: "insensitive" } },
                { email: { contains: search, mode: "insensitive" } },
                { phone: { contains: search, mode: "insensitive" } },
              ],
            }
          : {},
      ],
    };

    // Build order by object for sorting
    const orderBy: { [key: string]: "asc" | "desc" } = {};
    if (sortBy) {
      orderBy[sortBy] = sortOrder || "desc";
    } else {
      orderBy.createdAt = "desc"; // default sorting
    }

    // Get total count for pagination
    const totalCount = await prisma.user.count({ where });

    // Calculate pagination values
    const totalPages = Math.ceil(totalCount / pageSize);
    const skip = (page - 1) * pageSize;

    // Get users with pagination, sorting, and filtering
    const users = await prisma.user.findMany({
      where,
      orderBy,
      skip,
      take: pageSize,
      include: {
        orders: {
          select: {
            id: true,
            paymentStatus: true,
            amount: true,
            createdAt: true,
          },
        },
        _count: {
          select: {
            orders: true,
            savedTaxReturns: true,
          },
        },
      },
    });

    return {
      users,
      pagination: {
        currentPage: page,
        pageSize,
        totalPages,
        totalCount,
      },
    };
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}

export default async function AdminUsersPage({
  searchParams,
}: {
  searchParams: {
    search: string;
    page: string;
    sort_by: string;
    sort_order: "asc" | "desc";
  };
}) {
  const { search, page, sort_by, sort_order } = searchParams;
  const { users, pagination } = await getUsers(
    parseInt(page) || 1,
    10,
    search,
    sort_by,
    sort_order
  );

  const { currentPage, totalCount, totalPages, pageSize } = pagination;

  return (
    <ContentLayout title="Users">
      <DynamicBreadcrumb items={breadcrumbItems} />

      <Suspense fallback={<UsersLoading />}>
        <UsersTableHeader />
        <UserList users={users} />
      </Suspense>
      <ReusablePagination
        currentPage={currentPage}
        itemsPerPage={pageSize}
        totalItems={totalCount}
        totalPages={totalPages}
      />
    </ContentLayout>
  );
}
