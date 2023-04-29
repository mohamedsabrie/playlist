import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
export async function middleware(req) {
  const token = await getToken({
    req,
    secret: process.env.JWT_SECRET,
  });

  console.log(token);
  const { pathname } = req.nextUrl;
  const PUBLIC_FILE = /\.(.*)$/;
  if (
    token ||
    PUBLIC_FILE.test(pathname) ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/static") ||
    pathname.startsWith("/login")
  ) {
    return NextResponse.next();
  } else if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}
