"use client";

import React, { useState, useTransition } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Trash2, Loader2, AlertOctagon, Ban, X } from "lucide-react";
import { Prisma, PaymentStatus } from "@prisma/client";
import { format } from "date-fns";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { deleteOrders } from "../actions";
import { cn } from "@/lib/utils";

export type OrderWithRelations = Prisma.OrderGetPayload<{
  include: { user: true; individualTaxes: true };
}>;

const getStatusVariant = (status: PaymentStatus) => {
  switch (status) {
    case "PAID":
      return "success";
    case "PENDING":
      return "warning";
    default:
      return "destructive";
  }
};

const MobileOrderCard = ({ order }: { order: OrderWithRelations }) => (
  <Link href={`/admin/orders/${order.id}`} className="block">
    <Card className="mb-4 transition-all hover:shadow-md active:scale-[0.99]">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="font-medium">{order.user.name}</h3>
            <p className="text-sm text-muted-foreground">
              {order.individualTaxes?.tin || "N/A"}
            </p>
          </div>
          <Badge
            variant={getStatusVariant(order.paymentStatus)}
            className="ml-2"
          >
            {order.paymentStatus}
          </Badge>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Amount:</span>
            <span className="font-medium">
              ${order.amount?.toFixed(2) || "0.00"}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-muted-foreground">Created:</span>
            <span>{format(new Date(order.createdAt), "MMM d, yyyy")}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  </Link>
);

export default function OrdersList({
  orders,
}: {
  orders: OrderWithRelations[];
}) {
  const router = useRouter();
  const [selectedOrders, setSelectedOrders] = useState<Set<string>>(new Set());
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleSelectAll = () => {
    if (selectedOrders.size === orders.length) {
      setSelectedOrders(new Set());
    } else {
      setSelectedOrders(new Set(orders.map((order) => order.id)));
    }
  };

  const handleDeleteSelected = async () => {
    try {
      startTransition(async () => {
        const result = await deleteOrders(Array.from(selectedOrders));

        if (!result.success) {
          throw new Error(result.error || "Failed to delete orders");
        }

        setSelectedOrders(new Set());
        setIsDeleteDialogOpen(false);

        toast({
          title: "Success",
          description: `Successfully deleted ${selectedOrders.size} ${
            selectedOrders.size === 1 ? "order" : "orders"
          }`,
          variant: "success",
        });
      });
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to delete orders",
        variant: "destructive",
      });
    }
  };

  return (
    <div>
      {/* Bulk Actions */}
      {selectedOrders.size > 0 && (
        <div className="mb-4 p-4 bg-white border rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              {selectedOrders.size}{" "}
              {selectedOrders.size === 1 ? "order" : "orders"} selected
            </span>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => setIsDeleteDialogOpen(true)}
              className="gap-2"
            >
              <Trash2 className="h-4 w-4" />
              Delete Selected
            </Button>
          </div>
        </div>
      )}

      {/* Desktop View */}
      <div className="hidden md:block">
        <Card className="flex flex-col justify-between">
          <CardContent className="p-0">
            <div
              className={cn(
                "overflow-auto",
                selectedOrders.size
                  ? "h-[calc(100vh-395px)]"
                  : "h-[calc(100vh-315px)]"
              )}
            >
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-8">
                      <div className="flex justify-center items-center">
                        <Checkbox
                          checked={selectedOrders.size === orders.length}
                          onCheckedChange={handleSelectAll}
                        />
                      </div>
                    </TableHead>
                    <TableHead className="w-[25%]">User</TableHead>
                    <TableHead>TIN</TableHead>
                    <TableHead>Payment Status</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead className="w-[17%]">Created at</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {orders.map((order) => (
                    <TableRow
                      key={order.id}
                      className="cursor-pointer hover:bg-muted/50 transition-colors"
                      onClick={() => router.push(`/admin/orders/${order.id}`)}
                    >
                      <TableCell onClick={(e) => e.stopPropagation()}>
                        <div className="flex justify-center items-center">
                          <Checkbox
                            checked={selectedOrders.has(order.id)}
                            onCheckedChange={() => {
                              const newSelected = new Set(selectedOrders);
                              if (newSelected.has(order.id)) {
                                newSelected.delete(order.id);
                              } else {
                                newSelected.add(order.id);
                              }
                              setSelectedOrders(newSelected);
                            }}
                          />
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        {order.user.name}
                      </TableCell>
                      <TableCell>
                        {order.individualTaxes?.tin || "N/A"}
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusVariant(order.paymentStatus)}>
                          {order.paymentStatus}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        ${order.amount?.toFixed(2) || "0.00"}
                      </TableCell>
                      <TableCell>
                        {format(new Date(order.createdAt), "MMM d, yyyy")}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Mobile View */}
      <div className="md:hidden px-4">
        {orders.length > 0 ? (
          orders.map((order) => (
            <MobileOrderCard key={order.id} order={order} />
          ))
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            No orders found
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertOctagon className="h-5 w-5 text-destructive" />
              Are you absolutely sure?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete{" "}
              {selectedOrders.size}{" "}
              {selectedOrders.size === 1 ? "order" : "orders"}
              and remove all associated data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="gap-2">
              <X className="h-4 w-4" />
              Cancel
            </AlertDialogCancel>

            <AlertDialogAction
              onClick={handleDeleteSelected}
              className="bg-destructive hover:bg-destructive/90 text-white gap-2"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="h-4 w-4" />
                  Delete
                </>
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
