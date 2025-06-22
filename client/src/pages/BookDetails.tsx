import { useParams } from "react-router-dom";
import { bookData } from "@/data/bookData";
import type { Book } from "@/type/bookType";
import Header from "@/components/bookDetail/Header";
import AudioPlayer from "@/components/bookDetail/AudioPlayer";
import Summary from "@/components/bookDetail/Summary";
import RecommendedBooks from "@/components/bookDetail/RecommendedBooks";
import { useState, useEffect } from "react";

function BookDetails() {
  const bookId = useParams().id;
  const book: Book | undefined = bookData.find((b) => b.id.toString() === bookId);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    if (book) {
      // Update page title
      document.title = `${book.title} by ${book.author} | Book Summary`;
      
      // Update meta description
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', book.description);
      } else {
        const meta = document.createElement('meta');
        meta.name = 'description';
        meta.content = book.description;
        document.head.appendChild(meta);
      }

      // Update Open Graph tags for better social sharing
      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) {
        ogTitle.setAttribute('content', `${book.title} by ${book.author}`);
      } else {
        const meta = document.createElement('meta');
        meta.setAttribute('property', 'og:title');
        meta.content = `${book.title} by ${book.author}`;
        document.head.appendChild(meta);
      }

      const ogDescription = document.querySelector('meta[property="og:description"]');
      if (ogDescription) {
        ogDescription.setAttribute('content', book.description);
      } else {
        const meta = document.createElement('meta');
        meta.setAttribute('property', 'og:description');
        meta.content = book.description;
        document.head.appendChild(meta);
      }

      const ogImage = document.querySelector('meta[property="og:image"]');
      if (ogImage) {
        ogImage.setAttribute('content', book.coverImage);
      } else {
        const meta = document.createElement('meta');
        meta.setAttribute('property', 'og:image');
        meta.content = book.coverImage;
        document.head.appendChild(meta);
      }
    }

    // Cleanup function to reset title when component unmounts
    return () => {
      document.title = 'Book Summary';
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', 'Discover and explore book summaries');
      }
    };
  }, [book]);

  return (
    <div className="min-h-screen">
      <div className="md:w-4/5 mx-auto p-6 pb-20">
        <Header book={book} />
        <AudioPlayer 
          book={book} 
          onTimeUpdate={(time) => setCurrentTime(time)} 
        />
        <Summary book={book} currentTime={currentTime} />
        <RecommendedBooks currentBook={book} allBooks={bookData} />
      </div>
    </div>
  )
}

export default BookDetails