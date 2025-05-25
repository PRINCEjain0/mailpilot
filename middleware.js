import { NextResponse } from "next/server";

export function middleware(request) {
  const userEmail = request.cookies.get("userEmail")?.value;
  console.log("User Email from cookies:", userEmail);
  const { pathname } = request.nextUrl;

  const protectedRoutes = ["/form", "/analytics", "/checkout"];
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtectedRoute && !userEmail) {
    return NextResponse.redirect(new URL("/api/auth/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/form/:path*", "/analytics/:path*", "/checkout/:path*"],
};
