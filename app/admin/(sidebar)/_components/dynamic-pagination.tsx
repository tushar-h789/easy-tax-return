"use client";

import React from "react";
import Link from "next/link";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePathname } from "next/navigation";
import useQueryString from "@/hooks/use-query-string";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  siblings?: number;
  itemName?: string;
}

export function ReusablePagination({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  siblings = 2,
  itemName = "item",
}: PaginationProps) {
  const pathname = usePathname();
  const { createQueryString } = useQueryString();

  const getPageHref = (page: number) =>
    `${pathname}?${createQueryString({ page: page.toString() })}`;

  const renderPageLinks = () => {
    const pageLinks = [];

    // Always show first page
    pageLinks.push(
      <PaginationItem key={1}>
        <Link href={getPageHref(1)} passHref legacyBehavior>
          <PaginationLink isActive={currentPage === 1}>1</PaginationLink>
        </Link>
      </PaginationItem>
    );

    // Show ellipsis if there are more than 7 pages and we're not in the first 3 pages
    if (totalPages > 7 && currentPage > 3) {
      pageLinks.push(
        <PaginationItem key="ellipsis1">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    // Show sibling pages around the current page
    for (
      let i = Math.max(2, currentPage - siblings);
      i <= Math.min(totalPages - 1, currentPage + siblings);
      i++
    ) {
      pageLinks.push(
        <PaginationItem key={i}>
          <Link href={getPageHref(i)} passHref legacyBehavior>
            <PaginationLink isActive={currentPage === i}>{i}</PaginationLink>
          </Link>
        </PaginationItem>
      );
    }

    // Show ellipsis if there are more than 7 pages and we're not in the last 3 pages
    if (totalPages > 7 && currentPage < totalPages - 2) {
      pageLinks.push(
        <PaginationItem key="ellipsis2">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    // Always show last page
    if (totalPages > 1) {
      pageLinks.push(
        <PaginationItem key={totalPages}>
          <Link href={getPageHref(totalPages)} passHref legacyBehavior>
            <PaginationLink isActive={currentPage === totalPages}>
              {totalPages}
            </PaginationLink>
          </Link>
        </PaginationItem>
      );
    }

    return pageLinks;
  };

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <nav className="relative mt-4" aria-label="Pagination">
      <div className="text-center md:text-left md:absolute md:left-0 md:top-1/2 md:-translate-y-1/2 text-xs text-muted-foreground mb-4 md:mb-0">
        Showing <strong>{startItem}</strong> to <strong>{endItem}</strong> of{" "}
        <strong>{totalItems}</strong> {itemName}
        {totalItems !== 1 ? "s" : ""}
      </div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <Link
              href={getPageHref(Math.max(1, currentPage - 1))}
              passHref
              legacyBehavior
            >
              <PaginationPrevious
                className={cn({
                  "pointer-events-none opacity-50": currentPage === 1,
                })}
                aria-disabled={currentPage === 1}
              />
            </Link>
          </PaginationItem>

          {renderPageLinks()}

          <PaginationItem>
            <Link
              href={getPageHref(Math.min(totalPages, currentPage + 1))}
              passHref
              legacyBehavior
            >
              <PaginationNext
                className={cn({
                  "pointer-events-none opacity-50": currentPage === totalPages,
                })}
                aria-disabled={currentPage === totalPages}
              />
            </Link>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </nav>
  );
}

export default ReusablePagination;
