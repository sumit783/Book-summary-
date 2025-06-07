
import { useState, useEffect } from "react";
import type{ Book } from "@/types/book";
import AudioPlayer from "./AudioPlayer";
import { Separator } from "@/components/ui/separator";

interface BookDetailProps {
  book: Book;
}

const BookDetail = ({ book }: BookDetailProps) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [currentParagraphIndex, setCurrentParagraphIndex] = useState(-1);

  // This is a simplified approach to sync text highlighting with audio
  // In a real implementation, you would map timestamps to each paragraph
  useEffect(() => {
    // For demo purposes, we'll divide the total duration by the number of paragraphs
    const segmentDuration = book.duration / book.paragraphs.length;
    const newIndex = Math.floor(currentTime / segmentDuration);
    
    if (newIndex !== currentParagraphIndex && newIndex < book.paragraphs.length) {
      setCurrentParagraphIndex(newIndex);
    }
  }, [currentTime, book.duration, book.paragraphs.length, currentParagraphIndex]);

  return (
    <div className="container mx-auto px-4 max-w-4xl pt-24 pb-16">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/3 flex-shrink-0">
          <div className="sticky top-24 glass-morphism p-4 rounded-lg overflow-hidden">
            <div className="aspect-[2/3] relative overflow-hidden rounded-md mb-4">
              <img 
                src={book.coverImage} 
                alt={`${book.title} by ${book.author}`}
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-xl font-bold mb-1">{book.title}</h2>
            <p className="text-muted-foreground mb-4">{book.author}</p>
            
            <AudioPlayer 
              book={book} 
              onTimeUpdate={(time) => setCurrentTime(time)} 
            />
          </div>
        </div>
        
        <div className="w-full md:w-2/3">
          <div className="glass-morphism p-6 rounded-lg mb-8">
            <h1 className="text-3xl font-bold mb-2 text-gradient">{book.title}</h1>
            <h2 className="text-xl text-muted-foreground mb-4">{book.author}</h2>
            <p className="text-lg mb-6">{book.summary}</p>
            <Separator className="my-6 opacity-30" />
            
            <div className="space-y-6 leading-relaxed text-white/80">
              {book.paragraphs.map((paragraph, index) => (
                <p 
                  key={index} 
                  className={`transition-all duration-300 ${index === currentParagraphIndex ? 'bg-purple-500 inline-block' : ''}`}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
