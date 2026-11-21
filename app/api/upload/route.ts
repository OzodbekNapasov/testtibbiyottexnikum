import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { isGithubMode, uploadFileToGithub } from "@/lib/github-api";
import { isAdminAuthenticated } from "@/lib/admin-auth";

const ALLOWED_IMAGE_TYPES: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/gif": ".gif",
};

const ALLOWED_VIDEO_TYPES: Record<string, string> = {
  "video/mp4": ".mp4",
  "video/webm": ".webm",
  "video/ogg": ".ogg",
};

const MAX_IMAGE_BYTES = 10 * 1024 * 1024; // 10 MB
const MAX_VIDEO_BYTES = 25 * 1024 * 1024; // 25 MB (local; Vercel serverless is ~4.5 MB)

export async function POST(request: Request) {
  try {
    if (!(await isAdminAuthenticated())) {
      return NextResponse.json(
        { error: "Ruxsat berilmadi. Iltimos, admin panelga kiring." },
        { status: 401 },
      );
    }

    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Fayl yuklanmadi." }, { status: 400 });
    }

    const mimeType = file.type.toLowerCase();
    const isImage = mimeType in ALLOWED_IMAGE_TYPES;
    const isVideo = mimeType in ALLOWED_VIDEO_TYPES;

    if (!isImage && !isVideo) {
      return NextResponse.json(
        { error: "Faqat JPG, PNG, WebP, GIF rasmlar yoki MP4, WebM, OGG videolar yuklanishi mumkin." },
        { status: 400 },
      );
    }

    const maxBytes = isImage ? MAX_IMAGE_BYTES : MAX_VIDEO_BYTES;
    if (file.size > maxBytes) {
      const limitMb = Math.round(maxBytes / (1024 * 1024));
      return NextResponse.json(
        { error: `Fayl hajmi ${limitMb} MB dan oshmasligi kerak.` },
        { status: 413 },
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate safe unique filename using validated MIME extension
    const timestamp = Date.now();
    const safeExtension = isImage ? ALLOWED_IMAGE_TYPES[mimeType] : ALLOWED_VIDEO_TYPES[mimeType];
    const originalBasename = path.basename(file.name, path.extname(file.name));
    const safeBasename = originalBasename.replace(/[^a-zA-Z0-9_-]/g, "_").slice(0, 60) || "media";
    const filename = `${safeBasename}_${timestamp}${safeExtension}`;

    if (isGithubMode()) {
      const uploadResult = await uploadFileToGithub(
        `public/uploads/${filename}`,
        buffer,
        `Fayl yuklandi: ${filename}`,
      );

      return NextResponse.json({
        success: true,
        url: uploadResult.url,
      });
    } else {
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
