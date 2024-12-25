import { Role } from "@prisma/client";
import { DefaultSession } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      role: Role;
      // Add any other fields you want to be available in the session
    } & DefaultSession["user"];
  }

  interface User {
    // Define the structure of your User model here
    id: string;
    name?: string | null;
    email?: string | null;
    emailVerified?: Date | null;
    image?: string | null;
    role: Role;
    // Note: We don't include the password field here for security reasons
    createdAt: Date;
    updatedAt: Date;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    userId: string;
    role: Role;
    // Add any other fields you want to include in the JWT
  }
}
