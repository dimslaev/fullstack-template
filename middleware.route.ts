import { verifyToken } from "@/lib/server/auth";
import { type NextRequest, NextResponse } from "next/server";

const allowedRoutes = [
  "/api/auth/signin",
  "/api/auth/signup",
  "/api/auth/reset-password",
  "/api/auth/change-password",
];

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  if (!allowedRoutes.includes(pathname)) {
    // validate the user is authenticated
    const verifiedToken = await verifyToken(req);

    if (!verifiedToken) {
      if (pathname.startsWith("/api/")) {
        return new NextResponse(
          JSON.stringify({ error: { message: "authentication required" } }),
          { status: 401 }
        );
      } else {
        return NextResponse.redirect(new URL("/auth/signin", req.url));
      }
    }
  }

  return NextResponse.rewrite(new URL(req.url));
}

export const config = {
  matcher: ["/api/:path*", "/protected/:path*"],
};
