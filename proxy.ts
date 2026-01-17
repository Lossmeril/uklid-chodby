import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isLang, DEFAULT_LANG } from "@/lib/i18n";

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ignore next internals & assets
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const parts = pathname.split("/").filter(Boolean);
  const first = parts[0];

  // root -> /cs
  if (!first) {
    const url = req.nextUrl.clone();
    url.pathname = `/${DEFAULT_LANG}`;
    return NextResponse.redirect(url);
  }

  // unknown lang -> /cs + rest
  if (!isLang(first)) {
    const url = req.nextUrl.clone();
    url.pathname = `/${DEFAULT_LANG}${
      pathname.startsWith("/") ? "" : "/"
    }${pathname}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
