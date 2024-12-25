import React from "react";
import { ArrowUpRightFromSquare, Receipt, Save } from "lucide-react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import DynamicBreadcrumb from "@/components/custom/dynamic-breadcrumb";
import { format } from "date-fns";
import { ContentLayout } from "../../_components/content-layout";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    user_id: string;
  };
}

async function getUserDetails(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      createdAt: true,
      orders: {
        select: {
          id: true,
          invoiceId: true,
          amount: true,
          paymentStatus: true,
          createdAt: true,
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 5,
      },
      savedTaxReturns: {
        select: {
          id: true,
          createdAt: true,
          completionPercent: true,
          lastEditedField: true,
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 5,
      },
    },
  });

  if (!user) {
    notFound();
  }

  return user;
}

export default async function AdminUserDetailsPage({ params }: PageProps) {
  const user = await getUserDetails(params.user_id);

  const breadcrumbItems = [
    { label: "Dashboard", href: "/admin" },
    { label: "Users", href: "/admin/users" },
    { label: user?.name ?? "", isCurrentPage: true },
  ];

  return (
    <ContentLayout title={`User: ${user.name}`}>
      <div className="mb-6">
        <DynamicBreadcrumb items={breadcrumbItems} />
      </div>

      <div className="grid gap-6">
        {/* User Details Card */}
        <Card>
          <CardHeader>
            <CardTitle>User Details</CardTitle>
            <CardDescription>
              Member since {format(user.createdAt, "PPP")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Name</p>
                <p className="font-medium">{user.name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{user.email}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <p className="font-medium">{user.phone || "Not provided"}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tax Return Orders */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Receipt className="h-5 w-5" />
                Tax Return Orders
              </CardTitle>
              <CardDescription>
                Recent orders submitted by the user
              </CardDescription>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href={`/admin/users/${user.id}/orders`}>
                View All Orders
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            {user.orders.length > 0 ? (
              <div className="rounded-md border">
                <div className="grid grid-cols-5 gap-4 p-4 text-sm font-medium bg-muted">
                  <div>Invoice ID</div>
                  <div>Date</div>
                  <div>Amount</div>
                  <div>Status</div>
                  <div className="text-right">Actions</div>
                </div>
                {user.orders.map((order) => (
                  <div
                    key={order.id}
                    className="grid grid-cols-5 gap-4 p-4 border-t items-center text-sm"
                  >
                    <div>{order.invoiceId}</div>
                    <div>{format(order.createdAt, "PP")}</div>
                    <div>৳{order?.amount}</div>
                    <div>
                      <Badge
                        variant={
                          order.paymentStatus === "PAID" ? "success" : "warning"
                        }
                      >
                        {order.paymentStatus}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/admin/orders/${order.id}`}>
                          <ArrowUpRightFromSquare className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-muted-foreground">
                No orders found
              </div>
            )}
          </CardContent>
        </Card>

        {/* Saved Tax Returns */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Save className="h-5 w-5" />
                Saved Tax Returns
              </CardTitle>
              <CardDescription>
                Incomplete tax returns saved by the user
              </CardDescription>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href={`/admin/users/${user.id}/saved-returns`}>
                View All Saved Returns
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            {user.savedTaxReturns.length > 0 ? (
              <div className="rounded-md border">
                <div className="grid grid-cols-3 gap-4 p-4 text-sm font-medium bg-muted">
                  <div>Date</div>
                  <div>Completion</div>
                  <div className="text-right">Actions</div>
                </div>
                {user.savedTaxReturns.map((saved) => (
                  <div
                    key={saved.id}
                    className="grid grid-cols-3 gap-4 p-4 border-t items-center text-sm"
                  >
                    <div>{format(saved.createdAt, "PP")}</div>
                    <div>
                      <div className="flex items-center gap-2">
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div
                            className="bg-primary h-2.5 rounded-full"
                            style={{ width: `${saved.completionPercent}%` }}
                          />
                        </div>
                        <span className="text-sm">
                          {saved.completionPercent.toFixed(2)}%
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/admin/saved-returns/${saved.id}`}>
                          <ArrowUpRightFromSquare className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-muted-foreground">
                No saved returns found
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </ContentLayout>
  );
}
