import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { isGithubMode, uploadFileToGithub } from "@/lib/github-api";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "Fayl yuklanmadi." }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate unique filename to avoid collision
    const timestamp = Date.now();
    const originalExtension = path.extname(file.name);
    const originalBasename = path.basename(file.name, originalExtension);
    const safeBasename = originalBasename.replace(/[^a-zA-Z0-9]/g, "_");
    const filename = `${safeBasename}_${timestamp}${originalExtension}`;

    if (isGithubMode()) {
      // Direct GitHub API Upload
      const uploadResult = await uploadFileToGithub(
        `public/uploads/${filename}`,
        buffer,
        `Fayl yuklandi: ${filename}`
      );
      
      return NextResponse.json({
        success: true,
        url: uploadResult.url,
      });
    } else {
      // Local filesystem write
      const uploadsDir = path.join(process.cwd(), "public", "uploads");
      await fs.mkdir(uploadsDir, { recursive: true });
      const filePath = path.join(uploadsDir, filename);
      await fs.writeFile(filePath, buffer);

      return NextResponse.json({
        success: true,
        url: `/uploads/${filename}`,
      });
    }
  } catch (error) {
    console.error("Upload error:", error);
    const errMsg = error instanceof Error ? error.message : "Xatolik yuz berdi";
    return NextResponse.json({ error: errMsg }, { status: 500 });
  }
}
