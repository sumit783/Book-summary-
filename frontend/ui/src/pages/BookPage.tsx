import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getBookById } from "../data/books";
import BookDetail from "../components/bookDetail/BookDetail";
import { Button } from "@/components/ui/button";

const BookPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const book = id ? getBookById(id) : undefined;

  useEffect(() => {
    // Set page title and meta description for SEO
    if (book) {
      document.title = book.seoTitle || `${book.title} by ${book.author} | EchoBooks`;
      
      // You would implement proper meta tags with a helmet component in a real app
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute(
          "content",
          book.seoDescription || `Read or listen to the summary of ${book.title} by ${book.author}`
        );
      }
    }
  }, [book]);

  if (!book) {
    return (
      <div className="min-h-screen">
        <div className="container mx-auto pt-32 pb-16 px-4 text-center">
          <h1 className="text-2xl font-bold mb-4">Book Not Found</h1>
          <p className="mb-8">The book you are looking for does not exist.</p>
          <Button onClick={() => navigate("/")}>Return to Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <BookDetail book={book} />
    </div>
  );
};

export default BookPage;
