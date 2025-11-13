"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import SongSelector from "./song-selector";
import type { SongItem } from "../../types/prisma-types";

export default function EditorClient({ songs }: { songs: SongItem[] }) {
  const router = useRouter();
  const [selectedSong, setSelectedSong] = useState<SongItem | null>(null);

  const handleSelect = (id: number | "") => {
    if (id === "") {
      setSelectedSong(null);
      return;
    }
    const song = songs.find((s) => s.id === id) || null;
    setSelectedSong(song);
  };

  return (
    <div className="max-w-lg mx-auto space-y-4 p-4">
      {/* 下拉菜单 + artist 信息 */}
      <SongSelector
        songs={songs}
        selectedSong={selectedSong}
        onSelect={handleSelect}
      />

      {/* 选中后的显示区域 */}
      {selectedSong && (
        <div 
          className="card text-center cursor-pointer hover:bg-pink-200 transition"
          onClick={() => router.push(`/songs/${selectedSong.id}`)}
        >
          <p className="font-semibold text-lg">{selectedSong.title}</p>
          <p className="text-gray-700 text-sm mt-1">
            🎤 {selectedSong.artist || "不明なアーティスト"}
          </p>
        </div>
      )}
    </div>
  );
}
