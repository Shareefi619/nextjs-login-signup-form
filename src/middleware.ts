import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const publicPath = path === "/client/login" || path === "/client/register";

  const token = request.cookies.get("token")?.value || "";

  if (publicPath && token) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }
  if (!publicPath && !token) {
    return NextResponse.redirect(new URL("/client/register", request.nextUrl));
  }
}
// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/client/profile", "/client/login", "/client/register"],
};
