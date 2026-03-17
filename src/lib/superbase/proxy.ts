import { NextRequest, NextResponse } from "next/server";
import supabaseServerClient from "@/lib/superbase/server";

export async function proxy(request: NextRequest) {
  const { data: user } = await supabaseServerClient.auth.getUser();

  if (!user.user && request.nextUrl.pathname.startsWith("/crm")) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  if (user.user && request.nextUrl.pathname.startsWith("/login")) {
    const url = request.nextUrl.clone();
    url.pathname = "/crm";
    return NextResponse.redirect(url);
  }

  return NextResponse.next({ request });
}

export const config = {
  matcher: ["/crm/:path*", "/login"],
};
