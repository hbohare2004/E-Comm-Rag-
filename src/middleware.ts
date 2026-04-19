import { type NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/middleware";

function getPostAuthPath(request: NextRequest) {
  const params = new URLSearchParams(request.nextUrl.searchParams);
  params.delete("code");

  const query = params.toString();
  if (!query) return request.nextUrl.pathname;
  return `${request.nextUrl.pathname}?${query}`;
}

export async function middleware(request: NextRequest) {
  const authCode = request.nextUrl.searchParams.get("code");

  if (authCode && request.nextUrl.pathname !== "/auth/callback") {
    const callbackUrl = request.nextUrl.clone();
    const nextPath = getPostAuthPath(request);

    callbackUrl.pathname = "/auth/callback";
    callbackUrl.search = "";
    callbackUrl.searchParams.set("code", authCode);

    if (nextPath !== "/") {
      callbackUrl.searchParams.set("next", nextPath);
    }

    return NextResponse.redirect(callbackUrl);
  }

  return await createClient(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
