"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import useQueryString from "@/hooks/use-query-string";
import { PAYMENT_STATUS_OPTIONS } from "@/lib/constants";
import {
  Filter,
  Plus,
  Search,
  SortAsc,
  SortDesc,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { useDebounce } from "@/hooks/use-debounce";
import { Badge } from "@/components/ui/badge";

export default function OrdersTableHeader() {
  const router = useRouter();
  const { createQueryString } = useQueryString();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const initialSearchValue = searchParams.get("search") ?? "";
  const sortBy = searchParams.get("sort_by") ?? "";
  const sortOrder = searchParams.get("sort_order") ?? "";
  const filterStatus = searchParams.get("filter_status") ?? "";

  const [searchValue, setSearchValue] = useState(initialSearchValue);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const updateSearchQuery = useDebounce((value: string) => {
    router.push(
      `${pathname}?${createQueryString({
        search: value,
      })}`
    );
  }, 300);

  useEffect(() => {
    updateSearchQuery(searchValue);
  }, [searchValue, updateSearchQuery]);

  // Count active filters
  const activeFiltersCount = [sortBy, filterStatus].filter(Boolean).length;

  return (
    <div className="space-y-4 mt-4 md:mt-7 mb-4 px-4 md:px-0">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
        <div className="flex items-center gap-3">
          <h1 className="text-xl md:text-2xl font-bold">Tax Returns</h1>
          {activeFiltersCount > 0 && (
            <Badge variant="secondary" className="h-6">
              {activeFiltersCount} active{" "}
              {activeFiltersCount === 1 ? "filter" : "filters"}
            </Badge>
          )}
        </div>
        <Link href="/admin/orders/new">
          <Button size="sm" className="w-full sm:w-auto h-9 shadow-sm">
            <Plus className="mr-2 h-4 w-4" />
            New Tax Return
          </Button>
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search Input with enhanced focus state */}
        <div className="relative flex-grow">
          <Search
            className={`w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors duration-200 ${
              isSearchFocused ? "text-primary" : "text-gray-400"
            }`}
          />
          <Input
            type="search"
            placeholder="Search tax returns..."
            className="pl-10 w-full transition-shadow duration-200 hover:shadow-sm focus:shadow-sm"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
          />
          {searchValue && (
            <button
              onClick={() => setSearchValue("")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Desktop Controls */}
        <div className="hidden sm:flex gap-2">
          <Select
            value={sortBy}
            onValueChange={(value) => {
              router.push(
                `${pathname}?${createQueryString({
                  sort_by: value,
                })}`
              );
            }}
          >
            <SelectTrigger className="min-w-[130px] whitespace-nowrap shadow-sm">
              <SortAsc className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="amount">Amount</SelectItem>
              <SelectItem value="createdAt">Created At</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={sortOrder}
            onValueChange={(value) => {
              router.push(
                `${pathname}?${createQueryString({
                  sort_order: value,
                })}`
              );
            }}
          >
            <SelectTrigger className="min-w-[130px] whitespace-nowrap shadow-sm">
              {sortOrder === "asc" ? (
                <SortAsc className="mr-2 h-4 w-4" />
              ) : (
                <SortDesc className="mr-2 h-4 w-4" />
              )}
              <SelectValue placeholder="Sort Order" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="desc">Desc</SelectItem>
              <SelectItem value="asc">Asc</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={filterStatus}
            onValueChange={(value) => {
              router.push(
                `${pathname}?${createQueryString({
                  filter_status: value !== "ALL" ? value : "",
                  page: "",
                })}`
              );
            }}
          >
            <SelectTrigger className="min-w-[130px] whitespace-nowrap shadow-sm">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">ALL</SelectItem>
              {PAYMENT_STATUS_OPTIONS.map((option) => (
                <SelectItem value={option} key={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Mobile Filters Sheet */}
        <div className="sm:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="w-full shadow-sm">
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                Filters
                {activeFiltersCount > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {activeFiltersCount}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filters & Sort</SheetTitle>
              </SheetHeader>
              <div className="mt-4 space-y-4">
                {/* Sort By */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Sort By</label>
                  <Select
                    value={sortBy}
                    onValueChange={(value) => {
                      router.push(
                        `${pathname}?${createQueryString({
                          sort_by: value,
                        })}`
                      );
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="name">Name</SelectItem>
                      <SelectItem value="amount">Amount</SelectItem>
                      <SelectItem value="createdAt">Created At</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Sort Order */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Sort Order</label>
                  <Select
                    value={sortOrder}
                    onValueChange={(value) => {
                      router.push(
                        `${pathname}?${createQueryString({
                          sort_order: value,
                        })}`
                      );
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Sort Order" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="desc">Descending</SelectItem>
                      <SelectItem value="asc">Ascending</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Status Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Status</label>
                  <Select
                    value={filterStatus}
                    onValueChange={(value) => {
                      router.push(
                        `${pathname}?${createQueryString({
                          filter_status: value !== "ALL" ? value : "",
                          page: "",
                        })}`
                      );
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Filter by Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ALL">All Statuses</SelectItem>
                      {PAYMENT_STATUS_OPTIONS.map((option) => (
                        <SelectItem value={option} key={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Reset Filters Button */}
                {activeFiltersCount > 0 && (
                  <Button
                    variant="outline"
                    className="w-full mt-4"
                    onClick={() => {
                      router.push(pathname);
                    }}
                  >
                    Reset Filters
                  </Button>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
}
