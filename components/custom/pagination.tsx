"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
}

type PageItem = number | "...";

export default function Pagination({
  totalPages,
  currentPage,
}: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  // Calculate the range of pages to display
  const getVisiblePages = () => {
    const delta = 2;
    const range: number[] = [];
    const rangeWithDots: PageItem[] = [];

    range.push(1);

    let start = Math.max(2, currentPage - delta);
    let end = Math.min(totalPages - 1, currentPage + delta);

    if (currentPage - delta > 2) {
      rangeWithDots.push("...");
    }

    for (let i = start; i <= end; i++) {
      range.push(i);
    }

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...");
    }
    if (totalPages !== 1) {
      range.push(totalPages);
    }

    const res: PageItem[] = [];
    let j = 0;

    for (const rangeItem of range) {
      if (rangeWithDots[j] && rangeItem > (range[j] || 0)) {
        res.push(rangeWithDots[j]);
        j++;
      }
      res.push(rangeItem);
    }

    return res;
  };

  const visiblePages = getVisiblePages();
  const isFirstPage = currentPage <= 1;
  const isLastPage = currentPage >= totalPages;

  return (
    <div className="flex items-center justify-center space-x-2 py-8">
      {isFirstPage ? (
        <Button variant="outline" size="icon" disabled>
          <ChevronLeft className="h-4 w-4" />
        </Button>
      ) : (
        <Button variant="outline" size="icon" asChild>
          <Link
            href={createPageURL(currentPage - 1)}
            aria-label="Previous page"
          >
            <ChevronLeft className="h-4 w-4" />
          </Link>
        </Button>
      )}

      <div className="flex items-center space-x-2">
        {visiblePages.map((page, index) => {
          if (page === "...") {
            return (
              <span key={`ellipsis-${index}`} className="w-8 text-center">
                ...
              </span>
            );
          }

          const isActive = page === currentPage;

          return (
            <Button
              key={page}
              variant={isActive ? "default" : "outline"}
              size="icon"
              className="w-8"
              asChild
            >
              <Link
                href={createPageURL(page)}
                aria-current={isActive ? "page" : undefined}
                aria-label={`Page ${page}`}
              >
                {page}
              </Link>
            </Button>
          );
        })}
      </div>

      {isLastPage ? (
        <Button variant="outline" size="icon" disabled>
          <ChevronRight className="h-4 w-4" />
        </Button>
      ) : (
        <Button variant="outline" size="icon" asChild>
          <Link href={createPageURL(currentPage + 1)} aria-label="Next page">
            <ChevronRight className="h-4 w-4" />
          </Link>
        </Button>
      )}
    </div>
  );
}
