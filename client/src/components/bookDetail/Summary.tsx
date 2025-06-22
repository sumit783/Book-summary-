import { useEffect, useState } from 'react';
import type { Book } from '@/type/bookType';

interface SummaryProps {
  book: Book | undefined;
  currentTime: number;
}

const Summary = ({ book, currentTime }: SummaryProps) => {
  const [highlightedText, setHighlightedText] = useState<string>('');

  useEffect(() => {
    if (!book?.summary) return;
    
    // Calculate approximate time per sentence (assuming 3 seconds per sentence)
    const timePerSentence = 3;
    const currentSentenceIndex = Math.floor(currentTime / timePerSentence);
    
    // Highlight the current sentence
    const highlightedSummary = book.summary.split(/[.!?]+/).map((sentence, index) => {
      if (index === currentSentenceIndex) {
        return `<span class="bg-gray-100 dark:bg-gray-400 text-gray-900 dark:text-gray-900 px-1 rounded transition-colors duration-200">${sentence.trim()}</span>`;
      }
      return sentence.trim();
    }).join('. ');

    setHighlightedText(highlightedSummary);
  }, [book?.summary, currentTime]);

  if (!book?.summary) return null;

  return (
    <div className="my-8">
      <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Summary</h2>
      <div 
        className="prose prose-lg max-w-none dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: highlightedText }}
      />
    </div>
  );
};

export default Summary; 