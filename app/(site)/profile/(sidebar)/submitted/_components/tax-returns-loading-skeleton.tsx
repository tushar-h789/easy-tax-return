import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { FileText } from "lucide-react";

const SkeletonCard = () => (
  <Card className="h-full animate-pulse">
    <CardHeader>
      <div className="flex items-center gap-2">
        <FileText className="h-5 w-5 text-muted-foreground/50" />
        <div className="h-6 w-48 bg-muted rounded" />
      </div>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 bg-muted rounded" />
          <div className="h-4 w-32 bg-muted rounded" />
        </div>

        <div className="flex items-center gap-2">
          <div className="h-4 w-4 bg-muted rounded" />
          <div className="h-4 w-40 bg-muted rounded" />
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 bg-muted rounded-full" />
            <div className="h-4 w-16 bg-muted rounded" />
          </div>
          <div className="h-5 w-5 bg-muted rounded" />
        </div>

        <div className="h-4 w-36 bg-muted rounded" />
      </div>
    </CardContent>
  </Card>
);

export default function TaxReturnsLoadingSkeleton() {
  return (
    <div className="container mx-auto min-h-[500px]">
      <div className="flex justify-between items-center mb-8">
        <div className="h-10 w-64 bg-muted rounded animate-pulse" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </div>
  );
}
