"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useQueryString from "@/hooks/use-query-string";
import { Search, SortAsc, SortDesc, X } from "lucide-react";
import { useDebounce } from "@/hooks/use-debounce";
import { Badge } from "@/components/ui/badge";
import CreateUserDialog from "@/app/admin/orders/new/_components/create-user-dialog";

export default function UsersTableHeader() {
  const router = useRouter();
  const { createQueryString } = useQueryString();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const initialSearchValue = searchParams.get("search") ?? "";
  const sortBy = searchParams.get("sort_by") ?? "";
  const sortOrder = searchParams.get("sort_order") ?? "";

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
  const activeFiltersCount = [sortBy].filter(Boolean).length;

  return (
    <div className="space-y-4 mt-4 md:mt-7 mb-4 px-4 md:px-0">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
        <div className="flex items-center gap-3">
          <h1 className="text-xl md:text-2xl font-bold">Users</h1>
          {activeFiltersCount > 0 && (
            <Badge variant="secondary" className="h-6">
              {activeFiltersCount} active{" "}
              {activeFiltersCount === 1 ? "filter" : "filters"}
            </Badge>
          )}
        </div>
        <CreateUserDialog />
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
            placeholder="Search users..."
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

        {/* Sorting Controls */}
        <div className="flex gap-2">
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
              <SelectItem value="email">Email</SelectItem>
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
              <SelectItem value="desc">Descending</SelectItem>
              <SelectItem value="asc">Ascending</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
