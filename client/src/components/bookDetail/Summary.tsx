import { useEffect, useState } from 'react';
import type { Book } from '@/type/bookType';

interface SummaryProps {
  book: Book | undefined;
  currentTime: number;
  audioDuration?: number;
}

interface WordTiming {
  word: string;
  startTime: number;
  endTime: number;
  confidence?: number;
}

const Summary = ({ book, currentTime, audioDuration }: SummaryProps) => {
  const [highlightedText, setHighlightedText] = useState<string>('');
  const [wordTimings, setWordTimings] = useState<WordTiming[]>([]);
  const [, setCurrentWordIndex] = useState(-1);

  useEffect(() => {
    if (!book?.summary) return;
    
    // Generate word-level timestamps based on audio duration and text analysis
    const generateWordTimings = (text: string, totalDuration: number): WordTiming[] => {
      const words = text.split(/\s+/).filter(word => word.length > 0);
      const totalCharacters = words.reduce((sum, word) => sum + word.length, 0);
      const charactersPerSecond = totalCharacters / totalDuration;
      const timings: WordTiming[] = [];
      
      let currentTime = 0;
      for (const word of words) {
        // Calculate word duration based on character count and natural speech patterns
        const baseDuration = word.length / charactersPerSecond;
        
        // Adjust duration based on word characteristics
        const punctuationMultiplier = /[.!?,;:]$/.test(word) ? 1.5 : 1.0;
        const lengthMultiplier = word.length > 8 ? 1.3 : word.length < 3 ? 0.8 : 1.0;
        const naturalSpeechMultiplier = 0.8; // Account for natural speech pauses
        
        const wordDuration = baseDuration * punctuationMultiplier * lengthMultiplier * naturalSpeechMultiplier;
        
        timings.push({
          word,
          startTime: currentTime,
          endTime: currentTime + wordDuration,
          confidence: 0.9 // High confidence for generated timings
        });
        
        currentTime += wordDuration;
      }
      
      return timings;
    };

    // Use actual audio duration if available, otherwise estimate
    const duration = audioDuration || book.summary.length * 0.1;
    const timings = generateWordTimings(book.summary, duration);
    setWordTimings(timings);
  }, [book?.summary, audioDuration]);

  useEffect(() => {
    if (!book?.summary || wordTimings.length === 0) return;
    
    // Find the current word based on time
    const wordIndex = wordTimings.findIndex(timing => 
      currentTime >= timing.startTime && currentTime <= timing.endTime
    );
    
    setCurrentWordIndex(wordIndex >= 0 ? wordIndex : -1);
    
    // Create highlighted text with precise word-level highlighting
    const words = book.summary.split(/\s+/);
    const highlightedWords = words.map((word, index) => {
      const timing = wordTimings[index];
      
      if (!timing) return word;
      
      const isCurrentWord = index === wordIndex;
      const isNearCurrent = Math.abs(currentTime - timing.startTime) < 1; // Within 1 second
      const isPastWord = currentTime > timing.endTime;
      const isFutureWord = currentTime < timing.startTime;
      
      let highlightClass = '';
      if (isCurrentWord) {
        // Current word - most prominent highlight
        highlightClass = 'bg-yellow-400 dark:bg-yellow-500 text-black dark:text-white px-1.5 py-0.5 rounded-md font-bold shadow-sm border border-yellow-600 dark:border-yellow-400';
      } else if (isNearCurrent && !isPastWord) {
        // Words near current position - subtle highlight
        highlightClass = 'bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100 px-1 rounded';
      } else if (isPastWord) {
        // Past words - muted appearance
        highlightClass = 'text-gray-400 dark:text-gray-500';
      } else if (isFutureWord) {
        // Future words - normal appearance
        highlightClass = '';
      }
      
      return highlightClass ? `<span class="${highlightClass}">${word}</span>` : word;
    }).join(' ');

    setHighlightedText(highlightedWords);
  }, [book?.summary, currentTime, wordTimings]);

  if (!book?.summary) return null;

  return (
    <div className="my-8">
      <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Summary</h2>
      <div 
        className="prose prose-lg max-w-none dark:prose-invert leading-relaxed text-base"
        dangerouslySetInnerHTML={{ __html: highlightedText }}
      />
    </div>
  );
};

export default Summary; 