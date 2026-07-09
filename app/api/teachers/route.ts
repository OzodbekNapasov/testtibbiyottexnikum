import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { syncWithGithub } from "@/lib/git-sync";
import { isGithubMode, getFileFromGithub, updateFileInGithub } from "@/lib/github-api";

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

// Local read
async function readTeachersFileLocal(): Promise<Teacher[]> {
  try {
    const data = await fs.readFile(dataFilePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

// Local write
async function writeTeachersFileLocal(data: Teacher[]) {
  await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2), "utf-8");
}

// Hybrid getter
async function getTeachersData(): Promise<Teacher[]> {
  if (isGithubMode()) {
    const { content } = await getFileFromGithub("lib/teachers-data.json");
    if (!content) return [];
    try {
      return JSON.parse(content) as Teacher[];
    } catch {
      return [];
    }
  } else {
    return readTeachersFileLocal();
  }
}

// Hybrid setter
async function saveTeachersData(teachers: Teacher[], commitMessage: string) {
  if (isGithubMode()) {
    await updateFileInGithub("lib/teachers-data.json", JSON.stringify(teachers, null, 2), commitMessage);
    return { success: true };
  } else {
    await writeTeachersFileLocal(teachers);
    return await syncWithGithub(commitMessage);
  }
}

export async function GET() {
  try {
    const teachers = await getTeachersData();
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

    const teachers = await getTeachersData();
    
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
    const syncResult = await saveTeachersData(teachers, `Yangi pedagog qo'shildi: ${name}`);

    return NextResponse.json({
      success: true,
      teacher: newTeacher,
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
    const { id, name, position, photo, specialty, experience, description } = body;

    if (!id || !name || !position) {
      return NextResponse.json({ error: "ID, ism va lavozim kiritilishi shart." }, { status: 400 });
    }

    const teachers = await getTeachersData();
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
    const syncResult = await saveTeachersData(teachers, `Pedagog ma'lumotlari tahrirlandi: ${name}`);

    return NextResponse.json({
      success: true,
      teacher: updatedTeacher,
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

    const teachers = await getTeachersData();
    const itemToDelete = teachers.find((t) => t.id === id);

    if (!itemToDelete) {
      return NextResponse.json({ error: "Pedagog topilmadi." }, { status: 404 });
    }

    const filteredTeachers = teachers.filter((t) => t.id !== id);
    const syncResult = await saveTeachersData(filteredTeachers, `Pedagog o'chirildi: ${itemToDelete.name}`);

    return NextResponse.json({
      success: true,
      gitSync: syncResult,
    });
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : "Xatolik yuz berdi";
    return NextResponse.json({ error: errMsg }, { status: 500 });
  }
}
