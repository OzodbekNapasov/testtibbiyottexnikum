import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { syncWithGithub } from "@/lib/git-sync";
import { NewsItem } from "@/lib/constants";
import { isGithubMode, getFileFromGithub, updateFileInGithub } from "@/lib/github-api";

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

// Local filesystem fallback read
async function readNewsFileLocal(): Promise<NewsItem[]> {
  try {
    const data = await fs.readFile(dataFilePath, "utf-8");
    return JSON.parse(data) as NewsItem[];
  } catch {
    return [];
  }
}

// Local filesystem fallback write
async function writeNewsFileLocal(data: NewsItem[]) {
  await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2), "utf-8");
}

// Hybrid getter
async function getNewsData(): Promise<NewsItem[]> {
  if (isGithubMode()) {
    const { content } = await getFileFromGithub("lib/news-data.json");
    if (!content) return [];
    try {
      return JSON.parse(content) as NewsItem[];
    } catch {
      return [];
    }
  } else {
    return readNewsFileLocal();
  }
}

// Hybrid setter
async function saveNewsData(news: NewsItem[], commitMessage: string) {
  if (isGithubMode()) {
    await updateFileInGithub("lib/news-data.json", JSON.stringify(news, null, 2), commitMessage);
    return { success: true };
  } else {
    await writeNewsFileLocal(news);
    return await syncWithGithub(commitMessage);
  }
}

export async function GET() {
  try {
    const news = await getNewsData();
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

    const news = await getNewsData();

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

    news.unshift(newPost);
    const syncResult = await saveNewsData(news, `Yangilik qo'shildi: ${title}`);

    return NextResponse.json({
      success: true,
      post: newPost,
      gitSync: syncResult,
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

    const news = await getNewsData();
    const itemToDelete = news.find((n) => n.id === id);

    if (!itemToDelete) {
      return NextResponse.json({ error: "Yangilik topilmadi." }, { status: 404 });
    }

    const filteredNews = news.filter((n) => n.id !== id);
    const syncResult = await saveNewsData(filteredNews, `Yangilik o'chirildi: ${itemToDelete.title}`);

    return NextResponse.json({
      success: true,
      gitSync: syncResult,
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

    const news = await getNewsData();
    const index = news.findIndex((n) => n.id === id);

    if (index === -1) {
      return NextResponse.json({ error: "Yangilik topilmadi." }, { status: 404 });
    }

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
    const syncResult = await saveNewsData(news, `Yangilik tahrirlandi: ${title}`);

    return NextResponse.json({
      success: true,
      post: updatedPost,
      gitSync: syncResult,
    });
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : "Xatolik yuz berdi";
    return NextResponse.json({ error: errMsg }, { status: 500 });
  }
}
