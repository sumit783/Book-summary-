"use client";

import { useState, useRef, useEffect } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react";
import { Slider } from "../ui/slider";
import type { Book } from "@/type/bookType";

interface AudioPlayerProps {
  book: Book | undefined;
  onTimeUpdate?: (time: number) => void;
  onDurationChange?: (duration: number) => void;
}

export default function AudioPlayer({ book, onTimeUpdate, onDurationChange }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isSeeking, setIsSeeking] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const timeUpdateIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
      setIsLoading(false);
      onDurationChange?.(audio.duration);
    };

    const handleTimeUpdate = () => {
      if (!isSeeking) {
        const time = audio.currentTime;
        setCurrentTime(time);
        onTimeUpdate?.(time);
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
      onTimeUpdate?.(0);
    };

    const handleError = (e: Event) => {
      console.error('Audio error:', e);
      setIsLoading(false);
    };

    const handleSeeking = () => {
      setIsSeeking(true);
    };

    const handleSeeked = () => {
      setIsSeeking(false);
      const time = audio.currentTime;
      setCurrentTime(time);
      onTimeUpdate?.(time);
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);
    audio.addEventListener('seeking', handleSeeking);
    audio.addEventListener('seeked', handleSeeked);

    // Set up frequent time updates for precise word highlighting
    timeUpdateIntervalRef.current = setInterval(() => {
      if (isPlaying && !isSeeking) {
        const time = audio.currentTime;
        setCurrentTime(time);
        onTimeUpdate?.(time);
      }
    }, 100); // Update every 100ms for smooth word highlighting

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('seeking', handleSeeking);
      audio.removeEventListener('seeked', handleSeeked);
      
      if (timeUpdateIntervalRef.current) {
        clearInterval(timeUpdateIntervalRef.current);
      }
    };
  }, [onTimeUpdate, onDurationChange, isPlaying, isSeeking]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(error => {
        console.error('Error playing audio:', error);
      });
    }
    setIsPlaying(!isPlaying);
  };

  const handleSliderChange = (value: number[]) => {
    const audio = audioRef.current;
    if (!audio) return;
    
    const newTime = value[0];
    audio.currentTime = newTime;
    setCurrentTime(newTime);
    onTimeUpdate?.(newTime);
  };

  const handleVolumeChange = (value: number[]) => {
    const audio = audioRef.current;
    if (!audio) return;
    
    const newVolume = value[0];
    audio.volume = newVolume;
    setVolume(newVolume);
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const skipBackward = () => {
    const audio = audioRef.current;
    if (!audio) return;
    const newTime = Math.max(0, audio.currentTime - 10);
    audio.currentTime = newTime;
    setCurrentTime(newTime);
    onTimeUpdate?.(newTime);
  };

  const skipForward = () => {
    const audio = audioRef.current;
    if (!audio) return;
    const newTime = Math.min(duration, audio.currentTime + 10);
    audio.currentTime = newTime;
    setCurrentTime(newTime);
    onTimeUpdate?.(newTime);
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
                onClick={skipBackward}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                aria-label="Rewind 10 seconds"
              >
                <SkipBack className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </button>
              <button
                onClick={togglePlay}
                className="p-3 bg-primary hover:bg-primary/90 rounded-full transition-colors disabled:opacity-50"
                aria-label={isPlaying ? "Pause" : "Play"}
                disabled={isLoading}
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6 text-white" />
                ) : (
                  <Play className="w-6 h-6 text-white" />
                )}
              </button>
              <button
                onClick={skipForward}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                aria-label="Forward 10 seconds"
              >
                <SkipForward className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </button>
            </div>
            <div className="w-full flex items-center gap-2">
              <span className="text-xs text-gray-500 dark:text-gray-400 min-w-[2.5rem]">
                {formatTime(currentTime)}
              </span>
              <Slider
                value={[currentTime]}
                max={duration || 100}
                step={0.1}
                onValueChange={handleSliderChange}
                className="flex-1"
                disabled={isLoading}
              />
              <span className="text-xs text-gray-500 dark:text-gray-400 min-w-[2.5rem]">
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
        preload="metadata"
        onLoadStart={() => setIsLoading(true)}
      />
    </div>
  );
} 