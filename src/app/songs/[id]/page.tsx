import { prisma } from "@/lib/prisma";
import SongPlayerClient from "./song-player-client";

interface SongPageProps {
  params: { id: string };
}

export default async function SongPage({ params }: SongPageProps) {
  const songId = Number(params.id);
  const song = await prisma.song.findUnique({
    where: { id: songId },
  });

  if (!song) {
    return <p className="text-center text-red-500">曲が見つかりません。</p>;
  }

  return (
    <main className="min-h-screen bg-white text-black p-6 text-center">
      <h1 className="text-2xl font-bold mb-4">🎵 {song.title}</h1>
      <SongPlayerClient title={song.title} />
    </main>
  );
}
