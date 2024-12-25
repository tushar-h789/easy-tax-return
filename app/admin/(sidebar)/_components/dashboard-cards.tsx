"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Calculator,
  Users,
  Clock,
  BadgeDollarSign,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

type StatsType = {
  value: number;
  change: number;
};

interface DashboardCardsProps {
  stats: {
    totalReturns: StatsType;
    totalUsers: StatsType;
    pendingReturns: StatsType; // Changed from avgReturnValue
    totalRevenue: StatsType;
  };
}

export default function DashboardCards({ stats }: DashboardCardsProps) {
  const formatCurrency = (value: number) => {
    if (value >= 100000) {
      return `৳${(value / 100000).toFixed(1)}L`;
    }
    return `৳${value.toLocaleString()}`;
  };

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Total Returns
              </p>
              <h3 className="text-2xl font-bold mt-2">
                {stats.totalReturns.value.toLocaleString()}
              </h3>
              <p
                className={`text-sm flex items-center mt-2 ${
                  stats.totalReturns.change >= 0
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {stats.totalReturns.change >= 0 ? (
                  <ArrowUpRight className="w-4 h-4 mr-1" />
                ) : (
                  <ArrowDownRight className="w-4 h-4 mr-1" />
                )}
                {Math.abs(stats.totalReturns.change).toFixed(1)}% from last
                month
              </p>
            </div>
            <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
              <Calculator className="h-6 w-6 text-primary" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Registered Users
              </p>
              <h3 className="text-2xl font-bold mt-2">
                {stats.totalUsers.value.toLocaleString()}
              </h3>
              <p
                className={`text-sm flex items-center mt-2 ${
                  stats.totalUsers.change >= 0
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {stats.totalUsers.change >= 0 ? (
                  <ArrowUpRight className="w-4 h-4 mr-1" />
                ) : (
                  <ArrowDownRight className="w-4 h-4 mr-1" />
                )}
                {Math.abs(stats.totalUsers.change).toFixed(1)}% from last month
              </p>
            </div>
            <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
              <Users className="h-6 w-6 text-primary" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Pending Returns
              </p>
              <h3 className="text-2xl font-bold mt-2">
                {stats.pendingReturns.value.toLocaleString()}
              </h3>
              <p
                className={`text-sm flex items-center mt-2 ${
                  stats.pendingReturns.change <= 0
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {stats.pendingReturns.change <= 0 ? (
                  <ArrowDownRight className="w-4 h-4 mr-1" />
                ) : (
                  <ArrowUpRight className="w-4 h-4 mr-1" />
                )}
                {Math.abs(stats.pendingReturns.change).toFixed(1)}% from last
                month
              </p>
            </div>
            <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
              <Clock className="h-6 w-6 text-primary" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Total Revenue
              </p>
              <h3 className="text-2xl font-bold mt-2">
                {formatCurrency(stats.totalRevenue.value)}
              </h3>
              <p
                className={`text-sm flex items-center mt-2 ${
                  stats.totalRevenue.change >= 0
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {stats.totalRevenue.change >= 0 ? (
                  <ArrowUpRight className="w-4 h-4 mr-1" />
                ) : (
                  <ArrowDownRight className="w-4 h-4 mr-1" />
                )}
                {Math.abs(stats.totalRevenue.change).toFixed(1)}% from last
                month
              </p>
            </div>
            <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
              <BadgeDollarSign className="h-6 w-6 text-primary" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
