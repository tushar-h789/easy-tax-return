import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;
    const searchParams = req.nextUrl.searchParams;

    // Only redirect logged-in users from auth pages
    if (token && (path === "/login" || path === "/register")) {
      // Check if there's a callbackUrl and it's safe to redirect to
      const callbackUrl = searchParams.get("callbackUrl");

      const safeCallbackUrl =
        callbackUrl &&
        new URL(callbackUrl, req.url).hostname === req.nextUrl.hostname
          ? callbackUrl
          : null;

      if (token.role === "ADMIN") {
        return NextResponse.redirect(
          new URL(safeCallbackUrl || "/admin", req.url)
        );
      } else {
        return NextResponse.redirect(new URL(safeCallbackUrl || "/", req.url));
      }
    }

    // Protect admin routes
    if (path.startsWith("/admin")) {
      if (token?.role !== "ADMIN") {
        return NextResponse.redirect(new URL("/unauthorized", req.url));
      }
    }

    // Protect user-specific routes
    if (
      path.startsWith("/profile") ||
      path.startsWith("/individual-tax-return")
    ) {
      if (!token) {
        return NextResponse.redirect(
          new URL(`/login?callbackUrl=${encodeURIComponent(req.url)}`, req.url)
        );
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Allow access to login and register pages when there's no token
        if (
          !token &&
          (req.nextUrl.pathname === "/login" ||
            req.nextUrl.pathname === "/register")
        ) {
          return true;
        }
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: [
    "/admin/:path*",
    "/profile/:path*", // Changed from "/profile" to "/profile/:path*"
    "/transactions",
    "/individual-tax-return",
    "/login",
    "/register",
  ],
};
