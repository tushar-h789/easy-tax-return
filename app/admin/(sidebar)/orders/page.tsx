import { Suspense } from "react";
import { ContentLayout } from "../_components/content-layout";
import DynamicBreadcrumb from "../../../../components/custom/dynamic-breadcrumb";
import { PaymentStatus } from "@prisma/client";
import { getTaxReturnOrders } from "./actions";
import { ReusablePagination } from "../_components/dynamic-pagination";
import OrdersTableHeader from "./_components/orders-table-header";
import OrdersList from "./_components/order-list";
import OrdersLoading from "./_components/orders-loading";

const breadcrumbItems = [
  { label: "Dashboard", href: "/admin" },
  { label: "Tax Return Orders", href: "/admin/orders", isCurrentPage: true },
];

export default async function AdminTaxReturnsPage({
  searchParams,
}: {
  searchParams: {
    search: string;
    page: string;
    sort_by: string;
    sort_order: "asc" | "desc";
    filter_status: PaymentStatus;
  };
}) {
  const { search, page, sort_by, sort_order, filter_status } = searchParams;
  const { orders, pagination } = await getTaxReturnOrders(
    parseInt(page) || 1,
    10,
    search,
    sort_by,
    sort_order,
    filter_status
  );

  const { currentPage, totalCount, totalPages, pageSize } = pagination;

  return (
    <ContentLayout title="Tax Returns">
      <DynamicBreadcrumb items={breadcrumbItems} />

      <Suspense fallback={<OrdersLoading />}>
        <OrdersTableHeader />
        <OrdersList orders={orders} />
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
