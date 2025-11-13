"use client";

import { useEffect, useRef, useState } from "react";

export default function SongPlayerClient({ title }: { title: string }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // 播放/暂停
  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  // 格式化秒为 mm:ss
  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return "00:00";
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = Math.floor(seconds % 60)
      .toString()
      .padStart(2, "0");
    return `${m}:${s}`;
  };

  // 更新播放进度
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      setCurrentTime(audio.currentTime);
      setDuration(audio.duration || 0);
      setProgress((audio.currentTime / audio.duration) * 100);
    };

    audio.addEventListener("timeupdate", updateProgress);
    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
    };
  }, []);

  // 点击进度条跳转
  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * audio.duration;

    audio.currentTime = newTime;
    setProgress((newTime / audio.duration) * 100);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between">
      {/* 音频文件 */}
      <audio ref={audioRef} src={`/uploads/${title}.mp3`} preload="metadata" />

      {/* 播放控制区 */}
      <div className="fixed bottom-10 left-0 w-full bg-white/80 backdrop-blur-md py-4 px-6 shadow-inner flex flex-col items-center">
        {/* 进度条 */}
        <div
          className="relative h-3 w-3/4 bg-gray-300 rounded-full overflow-hidden cursor-pointer"
          onClick={handleSeek}
        >
          <div
            className="absolute top-0 left-0 h-full bg-pink-500 transition-all"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* 播放时间显示 */}
        <div className="flex justify-between w-3/4 text-sm text-gray-600">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>

        {/* 播放按钮 */}
        <button
          onClick={togglePlay}
          className="text-2xl focus:outline-none hover:scale-110 transition-transform"
        >
          {isPlaying ? "⏸️" : "▶️"}
        </button>
      </div>
    </div>
  );
}
