import { verifyToken } from "@/lib/server/auth";
import { type NextRequest, NextResponse } from "next/server";

const allowedRoutes = ["/api/auth/signin", "/api/auth/signup"];

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  if (!allowedRoutes.includes(pathname)) {
    // validate the user is authenticated
    const verifiedToken = await verifyToken(req);

    if (!verifiedToken) {
      return new NextResponse(
        JSON.stringify({ error: { message: "authentication required" } }),
        { status: 401 }
      );
    }
  }

  return NextResponse.rewrite(new URL(req.url));
}

export const config = {
  matcher: "/api/:function*",
  runtime: "nodejs",
};
