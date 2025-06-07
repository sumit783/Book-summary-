
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react";
import type{ Book } from "@/types/book";

interface AudioPlayerProps {
  book: Book;
  onTimeUpdate: (currentTime: number) => void;
}

const AudioPlayer = ({ book, onTimeUpdate }: AudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // For demo purposes, we'll use a placeholder audio file
  const audioUrl = book.audioUrl || "https://samplelib.com/lib/preview/mp3/sample-3s.mp3";
  
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    
    const setAudioData = () => {
      setDuration(audio.duration);
    };
    
    const updateTime = () => {
      const newTime = audio.currentTime;
      setCurrentTime(newTime);
      onTimeUpdate(newTime);
    };
    
    audio.addEventListener('loadedmetadata', setAudioData);
    audio.addEventListener('timeupdate', updateTime);
    
    return () => {
      audio.removeEventListener('loadedmetadata', setAudioData);
      audio.removeEventListener('timeupdate', updateTime);
    };
  }, [onTimeUpdate]);
  
  const handlePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;
    
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };
  
  const handleTimeChange = (newValue: number[]) => {
    const audio = audioRef.current;
    if (!audio) return;
    
    const newTime = newValue[0];
    audio.currentTime = newTime;
    setCurrentTime(newTime);
    onTimeUpdate(newTime);
  };
  
  const handleVolumeChange = (newValue: number[]) => {
    const audio = audioRef.current;
    if (!audio) return;
    
    const newVolume = newValue[0];
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
    audio.currentTime = Math.max(0, audio.currentTime - 10);
    setCurrentTime(audio.currentTime);
  };
  
  const skipForward = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.min(duration, audio.currentTime + 10);
    setCurrentTime(audio.currentTime);
  };
  
  return (
    <div className="glass-morphism rounded-lg p-4 space-y-4">
      <audio ref={audioRef} src={audioUrl} preload="metadata" />
      
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            {formatTime(currentTime)}
          </span>
          <span className="text-sm text-muted-foreground">
            {formatTime(duration)}
          </span>
        </div>
        <Slider
          value={[currentTime]}
          min={0}
          max={duration || 100}
          step={0.1}
          onValueChange={handleTimeChange}
          className="cursor-pointer"
        />
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={skipBackward}
            className="text-muted-foreground hover:text-white"
          >
            <SkipBack size={20} />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={handlePlayPause}
            className="h-12 w-12 rounded-full border border-primary/50 hover:border-primary"
          >
            {isPlaying ? (
              <Pause size={20} className="text-primary" />
            ) : (
              <Play size={20} className="text-primary ml-0.5" />
            )}
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={skipForward}
            className="text-muted-foreground hover:text-white"
          >
            <SkipForward size={20} />
          </Button>
        </div>
        
        <div className="flex items-center gap-2 w-28">
          <Volume2 size={18} className="text-muted-foreground" />
          <Slider
            value={[volume]}
            min={0}
            max={1}
            step={0.01}
            onValueChange={handleVolumeChange}
            className="cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
