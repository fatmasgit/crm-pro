import { NextRequest, NextResponse } from "next/server";

import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function proxy(request: NextRequest) {
  const supabase = await createSupabaseServerClient();

  const { data: user } = await supabase.auth.getUser();

  console.log("User:", user);

  // Not logged in → go to login
  if (!user.user && request.nextUrl.pathname !== "/login") {
    const url = request.nextUrl.clone();
    url.pathname = "/login";

    return NextResponse.redirect(url);
  }

  // Already logged in → don't allow login page
  if (user.user && request.nextUrl.pathname === "/login") {
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard";

    return NextResponse.redirect(url);
  }

  return NextResponse.next({ request });
}

export const config = {
  matcher: ["/dashboard", "/login", "/leads", "/reminders", "/users"],
};
