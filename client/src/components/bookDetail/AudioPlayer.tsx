"use client";

import { useState, useRef, useEffect } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react";
import { Slider } from "../ui/slider";
import type { Book } from "@/type/bookType";

interface AudioPlayerProps {
  book: Book | undefined;
  onTimeUpdate?: (time: number) => void;
}

export default function AudioPlayer({ book, onTimeUpdate }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const time = audioRef.current.currentTime;
      setCurrentTime(time);
      onTimeUpdate?.(time);
    }
  };

  const handleSliderChange = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0];
      setCurrentTime(value[0]);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.volume = value[0];
      setVolume(value[0]);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (!book) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800 p-4 z-50">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 w-full">
          {/* Book Info */}
          <div className="flex flex-col items-center md:flex-row md:items-center gap-4 w-full md:w-auto">
            <img
              src={book.coverImage}
              alt={book.title}
              className="hidden md:block w-20 h-20 md:w-12 md:h-12 rounded-md object-cover mb-2 md:mb-0"
            />
            <div className="text-center md:text-left">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                {book.title}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {book.author}
              </p>
            </div>
          </div>

          {/* Audio Controls */}
          <div className="w-full md:flex-1 flex flex-col items-center gap-2">
            <div className="flex items-center gap-4">
              <button
                onClick={() => {
                  if (audioRef.current) {
                    audioRef.current.currentTime = Math.max(0, currentTime - 10);
                  }
                }}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
                aria-label="Rewind 10 seconds"
              >
                <SkipBack className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </button>
              <button
                onClick={togglePlay}
                className="p-3 bg-primary hover:bg-primary/90 rounded-full"
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6 text-white" />
                ) : (
                  <Play className="w-6 h-6 text-white" />
                )}
              </button>
              <button
                onClick={() => {
                  if (audioRef.current) {
                    audioRef.current.currentTime = Math.min(
                      duration,
                      currentTime + 10
                    );
                  }
                }}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
                aria-label="Forward 10 seconds"
              >
                <SkipForward className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </button>
            </div>
            <div className="w-full flex items-center gap-2">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {formatTime(currentTime)}
              </span>
              <Slider
                value={[currentTime]}
                max={duration}
                step={1}
                onValueChange={handleSliderChange}
                className="flex-1"
              />
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {formatTime(duration)}
              </span>
            </div>
          </div>

          {/* Volume Control */}
          <div className="hidden md:flex items-center gap-2 min-w-[150px]">
            <Volume2 className="w-4 h-4 text-gray-600 dark:text-gray-300" />
            <Slider
              value={[volume]}
              max={1}
              step={0.1}
              onValueChange={handleVolumeChange}
              className="w-24"
            />
          </div>
        </div>
      </div>
      <audio
        ref={audioRef}
        src={book.audioLink}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={() => {
          if (audioRef.current) {
            setDuration(audioRef.current.duration);
          }
        }}
        onEnded={() => setIsPlaying(false)}
      />
    </div>
  );
} 