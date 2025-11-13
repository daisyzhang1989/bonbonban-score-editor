"use client";

import type { SongItem } from "../../types/prisma-types";

interface Props {
  songs: SongItem[];
  selectedSong: SongItem | null;
  onSelect: (id: number | "") => void;
}

export default function SongSelector({ songs, selectedSong, onSelect }: Props) {
  return (
    <section className="card">
      <label className="block mb-2 font-semibold text-sm text-gray-700">
        🎵 曲名を選択
      </label>

      <select
        className="input mb-4"
        value={selectedSong?.id || ""}
        onChange={(e) =>
          onSelect(e.target.value === "" ? "" : Number(e.target.value))
        }
      >
        <option value="">-- 曲を選択してください --</option>
        {songs.map((song) => (
          <option key={song.id} value={song.id}>
            {song.title}
          </option>
        ))}
      </select>
    </section>
  );
}
