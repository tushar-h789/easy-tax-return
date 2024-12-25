import AdminOrderDetails from "./_components/admin-order-details";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

interface Props {
  params: {
    order_id: string;
  };
}

export default async function AdminOrderDetailsPage({ params }: Props) {
  // Fetch the order with the user relation
  const order = await prisma.order.findUnique({
    where: {
      id: params.order_id,
    },
    include: {
      user: true,
    },
  });

  // If order not found, show 404
  if (!order) {
    notFound();
  }

  return <AdminOrderDetails taxReturnOrder={order} />;
}
