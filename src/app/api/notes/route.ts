import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

/** ✅ POST: 新增一个 Note */
export async function POST(req: Request) {
  try {
    const data = await req.json();

    // 数据验证（防止意外）
    if (!data.songId || typeof data.time !== "number") {
      return NextResponse.json({ error: "Invalid note data" }, { status: 400 });
    }

    const note = await prisma.note.create({
      data: {
        songId: data.songId,
        time: data.time,
        lane: data.lane,
        texture: data.texture,
      },
    });

    return NextResponse.json(note);
  } catch (err) {
    console.error("❌ Error creating note:", err);
    return NextResponse.json(
      { error: "Failed to create note" },
      { status: 500 }
    );
  }
}

/** 🗑 DELETE: 删除一个 Note */
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Missing note ID" }, { status: 400 });
    }

    await prisma.note.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("❌ Error deleting note:", err);
    return NextResponse.json(
      { error: "Failed to delete note" },
      { status: 500 }
    );
  }
}
