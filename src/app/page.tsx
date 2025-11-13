import { prisma } from "@/lib/prisma";
import EditorClient from "./components/editor-client";

export default async function Page() {
  // 从数据库取出所有歌曲的 id、title、artist
  const songs = await prisma.song.findMany({
    select: { id: true, title: true, artist: true },
    orderBy: { id: "asc" },
  });

  return (
    <main className="px-6 py-8">
      <h1 className="text-xl font-bold mb-6 text-center">🎵 リズム譜面エディター</h1>
      <EditorClient songs={songs} />
    </main>
  );
}
