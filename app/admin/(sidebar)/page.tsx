import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ContentLayout } from "./_components/content-layout";
import DashboardCards from "./_components/dashboard-cards";
import DashboardCharts from "./_components/dashboard-charts";
import prisma from "@/lib/prisma";
import { PaymentStatus } from "@prisma/client";

async function getPaymentStats() {
  try {
    const stats = await prisma.order.groupBy({
      by: ["paymentStatus"],
      _count: {
        _all: true,
      },
    });

    return stats.map((stat) => ({
      name: stat.paymentStatus,
      value: stat._count._all,
      color:
        stat.paymentStatus === PaymentStatus.PAID
          ? "#22c55e"
          : stat.paymentStatus === PaymentStatus.PENDING
          ? "#f59e0b"
          : stat.paymentStatus === PaymentStatus.CANCELLED
          ? "#ef4444"
          : "#6b7280",
    }));
  } catch (error) {
    console.error("Error fetching payment stats:", error);
    return [];
  }
}

async function getMonthlyStats() {
  try {
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const orders = await prisma.order.findMany({
      where: {
        createdAt: {
          gte: sixMonthsAgo,
        },
      },
      select: {
        createdAt: true,
        amount: true,
      },
    });

    const monthlyAggregates = orders.reduce((acc, order) => {
      const month = order.createdAt.toLocaleString("default", {
        month: "short",
      });

      if (!acc[month]) {
        acc[month] = {
          month,
          returns: 0,
          revenue: 0,
        };
      }

      acc[month].returns += 1;
      acc[month].revenue += order.amount || 0;

      return acc;
    }, {} as Record<string, { month: string; returns: number; revenue: number }>);

    const monthOrder = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const currentMonth = new Date().getMonth();
    const relevantMonths = Array.from({ length: 6 }, (_, i) => {
      const monthIndex = (currentMonth - i + 12) % 12;
      return monthOrder[monthIndex];
    }).reverse();

    return relevantMonths.map((month) => ({
      month,
      returns: monthlyAggregates[month]?.returns || 0,
      revenue: monthlyAggregates[month]?.revenue || 0,
    }));
  } catch (error) {
    console.error("Error fetching monthly stats:", error);
    return [];
  }
}

async function getDashboardSummary() {
  try {
    // Get current stats
    const [totalReturns, totalUsers, pendingReturns, totalRevenue] =
      await Promise.all([
        prisma.individualTaxes.count(),
        prisma.user.count(),
        prisma.order.count({
          where: { paymentStatus: PaymentStatus.PENDING },
        }),
        prisma.order.aggregate({
          _sum: {
            amount: true,
          },
          where: {
            paymentStatus: PaymentStatus.PAID,
          },
        }),
      ]);

    // Get last month's stats
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);

    const [
      lastMonthReturns,
      lastMonthUsers,
      lastMonthPending,
      lastMonthRevenue,
    ] = await Promise.all([
      prisma.individualTaxes.count({
        where: {
          createdAt: {
            gte: lastMonth,
          },
        },
      }),
      prisma.user.count({
        where: {
          createdAt: {
            gte: lastMonth,
          },
        },
      }),
      prisma.order.count({
        where: {
          paymentStatus: PaymentStatus.PENDING,
          createdAt: {
            gte: lastMonth,
          },
        },
      }),
      prisma.order.aggregate({
        _sum: {
          amount: true,
        },
        where: {
          createdAt: {
            gte: lastMonth,
          },
          paymentStatus: PaymentStatus.PAID,
        },
      }),
    ]);

    return {
      totalReturns: {
        value: totalReturns,
        change: totalReturns
          ? (lastMonthReturns / totalReturns) * 100 - 100
          : 0,
      },
      totalUsers: {
        value: totalUsers,
        change: totalUsers ? (lastMonthUsers / totalUsers) * 100 - 100 : 0,
      },
      pendingReturns: {
        value: pendingReturns,
        change: pendingReturns
          ? (lastMonthPending / pendingReturns) * 100 - 100
          : 0,
      },
      totalRevenue: {
        value: totalRevenue._sum.amount || 0,
        change:
          totalRevenue._sum.amount && lastMonthRevenue._sum.amount
            ? (lastMonthRevenue._sum.amount / totalRevenue._sum.amount) * 100 -
              100
            : 0,
      },
    };
  } catch (error) {
    console.error("Error fetching dashboard summary:", error);
    return {
      totalReturns: { value: 0, change: 0 },
      totalUsers: { value: 0, change: 0 },
      pendingReturns: { value: 0, change: 0 },
      totalRevenue: { value: 0, change: 0 },
    };
  }
}

export default async function AdminDashboardPage() {
  // Check authentication
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login");
  }

  try {
    // Fetch all stats in parallel
    const [paymentStats, monthlyStats, summaryStats] = await Promise.all([
      getPaymentStats(),
      getMonthlyStats(),
      getDashboardSummary(),
    ]);

    return (
      <ContentLayout title="Dashboard">
        <div className="space-y-6">
          <DashboardCards stats={summaryStats} />
          <DashboardCharts
            monthlyData={monthlyStats}
            paymentData={paymentStats}
          />
        </div>
      </ContentLayout>
    );
  } catch (error) {
    console.error("Error rendering dashboard:", error);
    return (
      <ContentLayout title="Dashboard">
        <div className="p-4 text-center">
          <p className="text-red-500">
            An error occurred while loading the dashboard. Please try again
            later.
          </p>
        </div>
      </ContentLayout>
    );
  }
}
