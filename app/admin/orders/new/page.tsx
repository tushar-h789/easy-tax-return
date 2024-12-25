import DynamicBreadcrumb from "@/components/custom/dynamic-breadcrumb";
import IndividualTaxReturnForm from "@/app/(site)/individual-tax-return/_components/individual-tax-return-form";
import UserSelection from "./_components/user-selection";
import prisma from "@/lib/prisma";
import { Role } from "@prisma/client";
import { Suspense } from "react";

async function getUsers() {
  try {
    const users = await prisma.user.findMany({
      where: {
        role: Role.USER, // Only get users with role USER, excluding admins
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error("Failed to fetch users");
  }
}

export default async function AdminNewOrderPage() {
  const users = await getUsers();

  const breadcrumbItems = [
    { label: "Admin", href: "/admin" },
    { label: "Orders", href: "/admin/orders" },
    { label: "New Order", isCurrentPage: true },
  ];

  return (
    <Suspense fallback="Loading...">
      <div className="bg-gray-50 min-h-screen">
        <div className="container mx-auto py-8 px-4 md:px-8">
          <div className="mb-8">
            <DynamicBreadcrumb items={breadcrumbItems} />
          </div>

          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4 font-serif">
              Create New Order
            </h1>
            <p className="text-gray-600 text-lg">
              Create a new tax return order by selecting an existing user or
              creating a new one.
            </p>
          </div>

          <UserSelection users={users} />

          <IndividualTaxReturnForm />
        </div>
      </div>
    </Suspense>
  );
}
