import { NextResponse } from "next/server";
import { isAdminAuthenticated, isAuthConfigured } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export async function GET() {
  const configured = isAuthConfigured();
  const authenticated = configured ? await isAdminAuthenticated() : false;
  return NextResponse.json({ authenticated, configured });
}
