"use server";

import { getServerSession } from "next-auth";
import { userFormSchema, UserFormValues } from "../../orders/new/schema";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { Role } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function createUser(input: UserFormValues) {
  try {
    // Get the current session
    const session = await getServerSession(authOptions);

    // Check if user is authenticated
    if (!session) {
      return {
        success: false,
        error: "Authentication required",
      };
    }

    // Check if user is admin
    const currentUser = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { role: true },
    });

    if (currentUser?.role !== Role.ADMIN) {
      return {
        success: false,
        error: "You do not have permission to create users",
      };
    }

    // Validate input data
    const validatedData = userFormSchema.parse(input);

    // Check if user with email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });

    if (existingUser) {
      return {
        success: false,
        error: "A user with this email already exists",
      };
    }

    // Create new user
    const user = await prisma.user.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        role: Role.USER, // Default role is USER
      },
    });

    // Revalidate relevant paths
    revalidatePath("/", "layout");

    return {
      success: true,
      data: user,
    };
  } catch (error) {
    console.error("Error creating user:", error);

    // Handle zod validation errors
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.errors[0].message,
      };
    }

    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to create user",
    };
  }
}
