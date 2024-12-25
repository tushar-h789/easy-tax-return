"use server";

import prisma from "@/lib/prisma";
import { RegisterFormData, registerSchema } from "./register/schema";
import { hash } from "bcrypt";
import { z } from "zod";

export async function registerUser(input: RegisterFormData) {
  try {
    const validatedFields = registerSchema.parse(input);

    const existingUser = await prisma.user.findUnique({
      where: { email: validatedFields.email },
    });

    if (existingUser) {
      return { success: false, error: "User with this email already exists" };
    }

    const hashedPassword = await hash(validatedFields.password, 12);

    const newUser = await prisma.user.create({
      data: {
        name: validatedFields.name,
        email: validatedFields.email,
        phone: validatedFields.phone,
        password: hashedPassword,
      },
    });

    const { password: _, ...userWithoutPassword } = newUser;

    return {
      success: true,
      user: userWithoutPassword,
      message: "User registered successfully",
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: "Validation error",
        details: error.errors.map((err) => err.message),
      };
    }
    if (error instanceof Error) {
      return {
        success: false,
        error: "Registration failed",
        details: error.message,
      };
    }
    return {
      success: false,
      error: "An unexpected error occurred",
      details: "Please try again later",
    };
  }
}
