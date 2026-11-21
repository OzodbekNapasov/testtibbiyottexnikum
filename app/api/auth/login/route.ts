import { NextResponse } from "next/server";
import {
  ADMIN_SESSION_COOKIE,
  createSessionToken,
  isAuthConfigured,
  verifyAdminCredentials,
} from "@/lib/admin-auth";

export async function POST(request: Request) {
  try {
    if (!isAuthConfigured()) {
      return NextResponse.json(
        {
          error:
            "Serverda admin autentifikatsiyasi sozlanmagan. .env.local faylida ADMIN_USERNAME, ADMIN_PASSWORD va ADMIN_SESSION_SECRET ni kiriting.",
        },
        { status: 503 },
      );
    }

    const body = await request.json();
    const username = typeof body.username === "string" ? body.username.trim() : "";
    const password = typeof body.password === "string" ? body.password : "";

    if (!username || !password) {
      return NextResponse.json(
        { error: "Login va parol kiritilishi shart." },
        { status: 400 },
      );
    }

    if (!verifyAdminCredentials(username, password)) {
      return NextResponse.json(
        { error: "Login yoki parol noto'g'ri kiritildi." },
        { status: 401 },
      );
    }

    const token = createSessionToken(username);
    const response = NextResponse.json({ success: true, username });

    response.cookies.set({
      name: ADMIN_SESSION_COOKIE,
      value: token,
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 12,
    });

    return response;
  } catch {
    return NextResponse.json({ error: "Kirishda xatolik yuz berdi." }, { status: 500 });
  }
}
