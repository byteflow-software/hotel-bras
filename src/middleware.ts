import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip login page
  if (pathname === "/gerenciar/login") {
    // If already authenticated, redirect to dashboard
    const session = request.cookies.get("admin_session");
    if (session?.value === "authenticated") {
      return NextResponse.redirect(new URL("/gerenciar", request.url));
    }
    return NextResponse.next();
  }

  // Protect all /gerenciar routes
  if (pathname.startsWith("/gerenciar")) {
    const session = request.cookies.get("admin_session");

    if (!session || session.value !== "authenticated") {
      const loginUrl = new URL("/gerenciar/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/gerenciar/:path*"],
};
