import { getToken } from "next-auth/jwt";
import { NextResponse, NextRequest } from "next/server";

export default async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const isLoginPage = request.nextUrl.pathname.startsWith("/auth/login");

  // Check if the NextAuth token exists and if it has a valid accessToken
  const isTokenInvalid = !token || !token.accessToken;

  if (isTokenInvalid && !isLoginPage) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|public|auth).*)"],
};
