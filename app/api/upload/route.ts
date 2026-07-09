import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "Fayl yuklanmadi." }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadsDir = path.join(process.cwd(), "public", "uploads");

    // Ensure the uploads directory exists
    await fs.mkdir(uploadsDir, { recursive: true });

    // Generate unique filename to avoid collision
    const timestamp = Date.now();
    const originalExtension = path.extname(file.name);
    const originalBasename = path.basename(file.name, originalExtension);
    const safeBasename = originalBasename.replace(/[^a-zA-Z0-9]/g, "_");
    const filename = `${safeBasename}_${timestamp}${originalExtension}`;
    const filePath = path.join(uploadsDir, filename);

    // Write file to filesystem
    await fs.writeFile(filePath, buffer);

    return NextResponse.json({
      success: true,
      url: `/uploads/${filename}`,
    });
  } catch (error) {
    console.error("Upload error:", error);
    const errMsg = error instanceof Error ? error.message : "Xatolik yuz berdi";
    return NextResponse.json({ error: errMsg }, { status: 500 });
  }
}
