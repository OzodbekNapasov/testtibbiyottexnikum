import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const hostname = request.headers.get("host") || "";

  // Subdomendan kelgan so'rov bo'lsa va ildiz (/) yo'lida bo'lsa, /qabul yo'liga rewrite qilamiz
  if (hostname.startsWith("qabul.")) {
    const url = request.nextUrl.clone();
    if (url.pathname === "/") {
      url.pathname = "/qabul";
      return NextResponse.rewrite(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|images).*)"],
};
