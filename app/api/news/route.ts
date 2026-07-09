import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { syncWithGithub } from "@/lib/git-sync";
import { NewsItem } from "@/lib/constants";

export const dynamic = "force-dynamic";

const dataFilePath = path.join(process.cwd(), "lib", "news-data.json");

// Helper to slugify Uzbek text
function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/o['’`‘]/g, "o")
    .replace(/g['’`‘]/g, "g")
    .replace(/sh/g, "sh")
    .replace(/ch/g, "ch")
    .replace(/['’`‘]/g, "")
    .replace(/[^a-z0-9\-]+/g, "-")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

async function readNewsFile(): Promise<NewsItem[]> {
  try {
    const data = await fs.readFile(dataFilePath, "utf-8");
    return JSON.parse(data) as NewsItem[];
  } catch {
    // If file doesn't exist, return empty array
    return [];
  }
}

async function writeNewsFile(data: NewsItem[]) {
  await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2), "utf-8");
}

export async function GET() {
  try {
    const news = await readNewsFile();
    return NextResponse.json(news);
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : "Xatolik yuz berdi";
    return NextResponse.json({ error: errMsg }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, excerpt, content, image, videoUrl, date, category } = body;

    if (!title || !content) {
      return NextResponse.json({ error: "Sarlavha va matn kiritilishi shart." }, { status: 400 });
    }

    const news = await readNewsFile();

    const newPost: NewsItem = {
      id: Date.now().toString(),
      slug: slugify(title),
      title,
      excerpt: excerpt || content.substring(0, 150) + "...",
      content,
      image: image || "",
      videoUrl: videoUrl || "",
      date: date || new Date().toISOString().split("T")[0],
      category: category || "Yangilik",
    };

    // Add to the beginning of the list
    news.unshift(newPost);
    await writeNewsFile(news);

    // Sync with GitHub
    const gitSyncResult = await syncWithGithub(`Yangilik qo'shildi: ${title}`);

    return NextResponse.json({
      success: true,
      post: newPost,
      gitSync: gitSyncResult,
    });
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : "Xatolik yuz berdi";
    return NextResponse.json({ error: errMsg }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID ko'rsatilmagan." }, { status: 400 });
    }

    const news = await readNewsFile();
    const itemToDelete = news.find((n) => n.id === id);

    if (!itemToDelete) {
      return NextResponse.json({ error: "Yangilik topilmadi." }, { status: 404 });
    }

    const filteredNews = news.filter((n) => n.id !== id);
    await writeNewsFile(filteredNews);

    // Sync with GitHub
    const gitSyncResult = await syncWithGithub(`Yangilik o'chirildi: ${itemToDelete.title}`);

    return NextResponse.json({
      success: true,
      gitSync: gitSyncResult,
    });
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : "Xatolik yuz berdi";
    return NextResponse.json({ error: errMsg }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, title, excerpt, content, image, videoUrl, date, category } = body;

    if (!id || !title || !content) {
      return NextResponse.json({ error: "ID, sarlavha va matn kiritilishi shart." }, { status: 400 });
    }

    const news = await readNewsFile();
    const index = news.findIndex((n) => n.id === id);

    if (index === -1) {
      return NextResponse.json({ error: "Yangilik topilmadi." }, { status: 404 });
    }

    // Update fields
    const updatedPost: NewsItem = {
      ...news[index],
      title,
      slug: slugify(title),
      excerpt: excerpt || content.substring(0, 150) + "...",
      content,
      image: image || "",
      videoUrl: videoUrl || "",
      date: date || news[index].date,
      category: category || "Yangilik",
    };

    news[index] = updatedPost;
    await writeNewsFile(news);

    // Sync with GitHub
    const gitSyncResult = await syncWithGithub(`Yangilik tahrirlandi: ${title}`);

    return NextResponse.json({
      success: true,
      post: updatedPost,
      gitSync: gitSyncResult,
    });
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : "Xatolik yuz berdi";
    return NextResponse.json({ error: errMsg }, { status: 500 });
  }
}
