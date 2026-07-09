import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { syncWithGithub } from "@/lib/git-sync";

export const dynamic = "force-dynamic";

const dataFilePath = path.join(process.cwd(), "lib", "teachers-data.json");

type Teacher = {
  id: string;
  name: string;
  position: string;
  photo: string;
  specialty?: string;
  experience?: string;
  description?: string;
};

// Read teachers from JSON file
async function readTeachersFile(): Promise<Teacher[]> {
  try {
    const data = await fs.readFile(dataFilePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading teachers file, returning empty array:", error);
    return [];
  }
}

// Write teachers to JSON file
async function writeTeachersFile(data: Teacher[]) {
  await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2), "utf-8");
}

export async function GET() {
  try {
    const teachers = await readTeachersFile();
    return NextResponse.json(teachers);
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : "Xatolik yuz berdi";
    return NextResponse.json({ error: errMsg }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, position, photo, specialty, experience, description } = body;

    if (!name || !position) {
      return NextResponse.json({ error: "Ism va lavozim kiritilishi shart." }, { status: 400 });
    }

    const teachers = await readTeachersFile();
    
    const newTeacher: Teacher = {
      id: Date.now().toString(),
      name,
      position,
      photo: photo || "",
      specialty: specialty || "",
      experience: experience || "",
      description: description || "",
    };

    teachers.push(newTeacher);
    await writeTeachersFile(teachers);

    // Sync with GitHub
    const gitSyncResult = await syncWithGithub(`Yangi pedagog qo'shildi: ${name}`);

    return NextResponse.json({
      success: true,
      teacher: newTeacher,
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
    const { id, name, position, photo, specialty, experience, description } = body;

    if (!id || !name || !position) {
      return NextResponse.json({ error: "ID, ism va lavozim kiritilishi shart." }, { status: 400 });
    }

    const teachers = await readTeachersFile();
    const index = teachers.findIndex((t) => t.id === id);

    if (index === -1) {
      return NextResponse.json({ error: "Pedagog topilmadi." }, { status: 404 });
    }

    const updatedTeacher: Teacher = {
      ...teachers[index],
      name,
      position,
      photo: photo || "",
      specialty: specialty || "",
      experience: experience || "",
      description: description || "",
    };

    teachers[index] = updatedTeacher;
    await writeTeachersFile(teachers);

    // Sync with GitHub
    const gitSyncResult = await syncWithGithub(`Pedagog ma'lumotlari tahrirlandi: ${name}`);

    return NextResponse.json({
      success: true,
      teacher: updatedTeacher,
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

    const teachers = await readTeachersFile();
    const itemToDelete = teachers.find((t) => t.id === id);

    if (!itemToDelete) {
      return NextResponse.json({ error: "Pedagog topilmadi." }, { status: 404 });
    }

    const filteredTeachers = teachers.filter((t) => t.id !== id);
    await writeTeachersFile(filteredTeachers);

    // Sync with GitHub
    const gitSyncResult = await syncWithGithub(`Pedagog o'chirildi: ${itemToDelete.name}`);

    return NextResponse.json({
      success: true,
      gitSync: gitSyncResult,
    });
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : "Xatolik yuz berdi";
    return NextResponse.json({ error: errMsg }, { status: 500 });
  }
}
