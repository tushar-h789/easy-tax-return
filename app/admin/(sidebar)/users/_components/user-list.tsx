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
import { Trash2, Loader2, AlertOctagon, X } from "lucide-react";
import { Prisma } from "@prisma/client";
import { format } from "date-fns";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

export type UserWithRelations = Prisma.UserGetPayload<{
  include: {
    orders: {
      select: {
        id: true;
        paymentStatus: true;
        amount: true;
        createdAt: true;
      };
    };
    _count: {
      select: {
        orders: true;
        savedTaxReturns: true;
      };
    };
  };
}>;

const MobileUserCard = ({ user }: { user: UserWithRelations }) => (
  <Link href={`/admin/users/${user.id}`} className="block">
    <Card className="mb-4 transition-all hover:shadow-md active:scale-[0.99]">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="font-medium">{user.name}</h3>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Orders:</span>
            <span className="font-medium">{user._count.orders}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Saved Returns:</span>
            <span className="font-medium">{user._count.savedTaxReturns}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Joined:</span>
            <span>{format(new Date(user.createdAt), "MMM d, yyyy")}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  </Link>
);

export default function UserList({ users }: { users: UserWithRelations[] }) {
  const router = useRouter();
  const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set());
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleSelectAll = () => {
    if (selectedUsers.size === users.length) {
      setSelectedUsers(new Set());
    } else {
      setSelectedUsers(new Set(users.map((user) => user.id)));
    }
  };

  const handleDeleteSelected = async () => {
    // Will be implemented when you create the delete action
  };

  return (
    <div>
      {/* Bulk Actions */}
      {selectedUsers.size > 0 && (
        <div className="mb-4 p-4 bg-white border rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              {selectedUsers.size} {selectedUsers.size === 1 ? "user" : "users"}{" "}
              selected
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
                selectedUsers.size
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
                          checked={selectedUsers.size === users.length}
                          onCheckedChange={handleSelectAll}
                        />
                      </div>
                    </TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Orders</TableHead>
                    <TableHead>Saved Returns</TableHead>
                    <TableHead className="w-[17%]">Joined</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {users.map((user) => (
                    <TableRow
                      key={user.id}
                      className="cursor-pointer hover:bg-muted/50 transition-colors"
                      onClick={() => router.push(`/admin/users/${user.id}`)}
                    >
                      <TableCell onClick={(e) => e.stopPropagation()}>
                        <div className="flex justify-center items-center">
                          <Checkbox
                            checked={selectedUsers.has(user.id)}
                            onCheckedChange={() => {
                              const newSelected = new Set(selectedUsers);
                              if (newSelected.has(user.id)) {
                                newSelected.delete(user.id);
                              } else {
                                newSelected.add(user.id);
                              }
                              setSelectedUsers(newSelected);
                            }}
                          />
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.phone || "N/A"}</TableCell>
                      <TableCell>{user._count.orders}</TableCell>
                      <TableCell>{user._count.savedTaxReturns}</TableCell>
                      <TableCell>
                        {format(new Date(user.createdAt), "MMM d, yyyy")}
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
        {users.length > 0 ? (
          users.map((user) => <MobileUserCard key={user.id} user={user} />)
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            No users found
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
              {selectedUsers.size} {selectedUsers.size === 1 ? "user" : "users"}{" "}
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
