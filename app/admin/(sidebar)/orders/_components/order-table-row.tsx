"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TableCell, TableRow } from "@/components/ui/table";
import { kebabToNormal } from "@/lib/utils";
import dayjs from "dayjs";
import { Edit, MoreHorizontal, Trash2 } from "lucide-react";
import Link from "next/link";
import { useTransition } from "react";
import { NumericFormat } from "react-number-format";
import { deleteOrders } from "../actions";
import { OrderWithRelations } from "./order-list";
import { useToast } from "@/hooks/use-toast";

export default function OrderTableRow({
  order,
}: {
  order: OrderWithRelations;
}) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleDelete = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();

    startTransition(async () => {
      const result = await deleteOrders([order.id]);

      if (result.success) {
        toast({
          title: "Order Deleted",
          description: result.message,
          variant: "success",
        });
      } else {
        toast({
          title: "Error Deleting Order",
          description: result.message,
          variant: "destructive",
        });
      }
    });
  };

  return (
    <TableRow
      className={`cursor-pointer ${isPending ? "opacity-30" : "opacity-100"}`}
    >
      <TableCell>
        <div className="flex justify-center">
          <Checkbox />
        </div>
      </TableCell>

      <TableCell className="w-[25%]">
        <Link href={`/admin/orders/${order.id}`} passHref>
          <div className="flex">
            <Avatar className="mr-3">
              <AvatarFallback>
                {order.user?.name?.charAt(0) ?? ""}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{order.user.name}</p>
              <p className="text-xs text-gray-500 font-normal">
                {order.user.email}
              </p>
            </div>
          </div>
        </Link>
      </TableCell>
      <TableCell className="hidden md:table-cell">
        {order.individualTaxes?.tin}
      </TableCell>
      <TableCell className="">
        <Badge variant="outline">{kebabToNormal(order.paymentStatus)}</Badge>
      </TableCell>
      <TableCell className="hidden md:table-cell">
        £
        <NumericFormat
          displayType="text"
          value={order.amount?.toFixed(2) ?? "0.00"}
          thousandsGroupStyle="lakh"
          thousandSeparator=","
          renderText={(value) => <>{value}</>}
        />
      </TableCell>
      <TableCell className="hidden md:table-cell">
        {dayjs(new Date(order.createdAt)).format("DD-MM-YYYY HH:mm A")}
      </TableCell>

      <TableCell className="w-10">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-haspopup="true" size="icon" variant="ghost">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={(e) => {
                handleDelete(e);
              }}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
