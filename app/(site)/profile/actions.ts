"use server";

import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { z } from "zod";
import {
  ConfirmPaymentInput,
  confirmPaymentSchema,
} from "./submitted/[submitted_id]/schema";
import { revalidatePath } from "next/cache";
import { PaymentStatus } from "@prisma/client";

type UpdateUserData = {
  phone?: string;
  // Add more updateable fields here in the future
};

export async function updateUser(data: UpdateUserData) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      throw new Error("Unauthorized");
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data,
      select: {
        phone: true,
        // Add more fields here as they become updateable
      },
    });

    return updatedUser;
  } catch (error) {
    throw error;
  }
}

export async function confirmPayment(
  input: ConfirmPaymentInput,
  orderId: string
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return {
        success: false,
        error: "Authentication required",
      };
    }

    // Validate input
    const validatedData = confirmPaymentSchema.parse(input);

    // Get the order and verify it belongs to the user
    const order = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
      include: {
        user: true,
      },
    });

    if (!order) {
      return {
        success: false,
        error: "Order not found",
      };
    }

    if (order.userId !== session.user.id) {
      return {
        success: false,
        error: "Unauthorized",
      };
    }

    // Update the order with payment details
    const updatedOrder = await prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        phoneNumberUsed: validatedData.phoneNumberUsed,
        transactionID: validatedData.transactionID,
        paymentMethod: "BKASH",
      },
    });

    // Revalidate relevant paths
    revalidatePath("/", "layout");

    return {
      success: true,
      data: updatedOrder,
    };
  } catch (error) {
    console.error("Error confirming payment:", error);

    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: "Invalid input data",
        validationErrors: error.errors,
      };
    }

    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "An error occurred while confirming payment",
    };
  }
}
