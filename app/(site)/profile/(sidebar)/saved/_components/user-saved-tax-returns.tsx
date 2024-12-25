"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  FileText,
  Calendar,
  ArrowRight,
  Loader2,
  Trash2,
  Clock,
} from "lucide-react";
import Link from "next/link";
import { SavedTaxReturns } from "@prisma/client";
import { useState, useTransition } from "react";
import { useToast } from "@/hooks/use-toast";
import { deleteSavedTaxReturn } from "@/app/(site)/individual-tax-return/actions";
import Pagination from "@/components/custom/pagination";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface UserSavedTaxReturnsProps {
  savedReturns: SavedTaxReturns[];
  totalPages: number;
  currentPage: number;
}

const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
};

export default function UserSavedTaxReturns({
  savedReturns,
  totalPages,
  currentPage,
}: UserSavedTaxReturnsProps) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedReturnId, setSelectedReturnId] = useState<string | null>(null);

  const openDeleteDialog = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    setSelectedReturnId(id);
    setDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!selectedReturnId) return;

    startTransition(async () => {
      try {
        const result = await deleteSavedTaxReturn(selectedReturnId);
        if (result.success) {
          toast({
            title: "Success",
            description: "Tax return deleted successfully",
            variant: "success",
          });
          setDeleteDialogOpen(false);
          setSelectedReturnId(null);
        } else {
          toast({
            title: "Error",
            description: result.error || "Failed to delete tax return",
            variant: "destructive",
          });
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Something went wrong",
          variant: "destructive",
        });
      }
    });
  };

  return (
    <>
      <div className="container mx-auto min-h-[500px]">
        <div className="flex justify-between items-center mb-8">
          <div className="space-y-1">
            <h1 className="text-4xl font-bold text-primary">
              Saved Tax Returns
            </h1>
          </div>
          <Button asChild className="gap-2">
            <Link href="/individual-tax-return">
              <FileText className="h-4 w-4" />
              Start New Return
            </Link>
          </Button>
        </div>

        {savedReturns.length === 0 ? (
          <Card className="bg-muted border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <FileText className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-xl font-medium text-muted-foreground mb-2">
                No saved returns found
              </p>
              <p className="text-sm text-muted-foreground mb-4">
                Start a new tax return to get started
              </p>
              <Button asChild className="gap-2">
                <Link href="/individual-tax-return">
                  <FileText className="h-4 w-4" />
                  Start New Return
                </Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedReturns.map((taxReturn) => {
                const taxData = taxReturn.taxData as any;
                return (
                  <Link
                    href={`/profile/saved/${taxReturn.id}`}
                    key={taxReturn.id}
                  >
                    <Card className="h-full transition-all duration-200 hover:shadow-lg hover:border-primary/20 group cursor-pointer">
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          <div className="flex items-center gap-2 font-mono">
                            <FileText className="h-5 w-5 text-muted-foreground" />
                            <span>{taxData.tin || "Not provided"}</span>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="opacity-0 group-hover:opacity-100 hover:bg-destructive/10 hover:text-destructive"
                            disabled={isPending}
                            onClick={(e) => openDeleteDialog(taxReturn.id, e)}
                          >
                            {isPending ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Trash2 className="h-4 w-4" />
                            )}
                          </Button>
                        </CardTitle>
                      </CardHeader>

                      <CardContent>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Calendar className="h-4 w-4" />
                              <span>
                                Assessment Year:{" "}
                                <span className="font-medium text-foreground">
                                  {taxData.assessmentYear || "Not provided"}
                                </span>
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Clock className="h-4 w-4" />
                              <span>
                                Last modified:{" "}
                                <span className="font-medium text-foreground">
                                  {formatDate(new Date(taxReturn.updatedAt))}
                                </span>
                              </span>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div className="flex justify-between items-center text-sm">
                              <span className="text-muted-foreground">
                                Completion
                              </span>
                              <span className="font-medium">
                                {Math.round(taxReturn.completionPercent)}%
                              </span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                              <div
                                className="bg-primary h-full transition-all duration-300"
                                style={{
                                  width: `${taxReturn.completionPercent}%`,
                                }}
                              />
                            </div>
                          </div>

                          <div className="flex items-center justify-end pt-2 text-sm font-medium text-primary group-hover:translate-x-1 transition-transform duration-200">
                            Continue
                            <ArrowRight className="ml-1 h-4 w-4" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>

            {totalPages > 1 && (
              <div className="mt-8">
                <Pagination totalPages={totalPages} currentPage={currentPage} />
              </div>
            )}
          </>
        )}
      </div>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Tax Return</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this saved tax return? This action
              cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex items-center gap-2 sm:justify-end">
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isPending}
              className="gap-2"
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
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
