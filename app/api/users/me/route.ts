import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    // Get the current session
    const session = await getServerSession(authOptions);

    console.log(session);

    // If no session exists, return unauthorized
    if (!session?.user?.email) {
      return new NextResponse(
        JSON.stringify({
          error: "Unauthorized - Please sign in to access this resource",
        }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Fetch user data including related information
    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
      include: {
        // Include tax return data if it exists

        // Include orders if needed
        orders: {
          include: {
            individualTaxes: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    // If no user found with the email
    if (!user) {
      return new NextResponse(JSON.stringify({ error: "User not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Remove sensitive information before sending response
    const { password, ...safeUser } = user;

    return new NextResponse(JSON.stringify(safeUser), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching user data:", error);
    return new NextResponse(
      JSON.stringify({
        error: "Internal server error",
        details:
          error instanceof Error ? error.message : "Unknown error occurred",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
