import { useParams } from "react-router-dom";
import type { Book } from "@/type/bookType";
import Header from "@/components/bookDetail/Header";
import AudioPlayer from "@/components/bookDetail/AudioPlayer";
import Summary from "@/components/bookDetail/Summary";
import RecommendedBooks from "@/components/bookDetail/RecommendedBooks";
import Comment from "@/components/bookDetail/Comment";
import { useState, useEffect } from "react";
import { getBookById, getBooks } from "@/services/api";

function BookDetails() {
  const { id: bookId } = useParams();
  const [currentTime, setCurrentTime] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);
  const [book, setBook] = useState<Book | undefined>(undefined);
  const [allBooks, setAllBooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchBook = async () => {
      if (!bookId) return;
      try {
        const response = await getBookById(bookId);
        const b = response.data.book;
        const mappedBook: Book = {
          id: b._id,
          title: b.title,
          author: b.author,
          coverImage: import.meta.env.VITE_BACKEND_URL + b.coverImage,
          description: b.description,
          summary: b.summary,
          categories: b.categories,
          metaTitle: b.metaTitle,
          metaDescription: b.metaDescription,
          metaKeywords: b.metaKeywords,
          genre: b.genre,
          affiliateLink: b.affiliateLink,
          publicationDate: b.publicationDate,
          rating: b.rating,
          reviews: b.reviews,
          audioLink: import.meta.env.VITE_BACKEND_URL + b.audioUri,
        };
        setBook(mappedBook);
      } catch (error) {
        console.error("Error fetching book:", error);
      }
    };
    fetchBook();
  }, [bookId]);

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const response = await getBooks();
        if (response.data && response.data.books) {
          const mappedBooks: Book[] = response.data.books.map((b: any) => ({
            id: b._id,
            title: b.title,
            author: b.author,
            coverImage: import.meta.env.VITE_BACKEND_URL + b.coverImage,
            description: b.description,
            summary: b.summary,
            categories: b.categories,
            metaTitle: b.metaTitle,
            metaDescription: b.metaDescription,
            metaKeywords: b.metaKeywords,
            genre: b.genre,
            affiliateLink: b.affiliateLink,
            publicationDate: b.publicationDate,
            rating: b.rating,
            reviews: b.reviews,
            audioLink: import.meta.env.VITE_BACKEND_URL + b.audioUri,
          }));
          setAllBooks(mappedBooks);
        }
      } catch (error) {
        console.error("Error fetching all books:", error);
      }
    };
    fetchAllBooks();
  }, []);

  useEffect(() => {
    if (book) {
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
          onDurationChange={(duration) => setAudioDuration(duration)}
        />
        <Summary 
          book={book} 
          currentTime={currentTime}
          audioDuration={audioDuration}
        />
        <RecommendedBooks currentBook={book} allBooks={allBooks} />
        {book && <Comment bookId={String(book.id)} />}
      </div>
    </div>
  );
}

export default BookDetails;