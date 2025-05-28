import { Link } from "react-router-dom";
import type { Book } from "@/types/book";
import { Card, CardContent } from "@/components/ui/card";

interface BookCardProps {
  book: Book;
}

const BookCard = ({ book }: BookCardProps) => {
  return (
    <Link to={`/book/${book.id}`}>
      <Card className="h-[60vh] overflow-hidden glass-morphism transition-all duration-300 hover:shadow-[0_8px_30px_rgba(118,74,241,0.15)] hover:-translate-y-1">
        <CardContent className="p-0 relative group h-full flex flex-col">
          <div className="relative flex-1 overflow-hidden">
            <img
              src={book.coverImage}
              alt={`${book.title} by ${book.author}`}
              className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60"></div>
          </div>
          <div className="p-4 text-white backdrop-blur-sm">
            <h3 className="text-xl font-semibold line-clamp-1 mb-1">{book.title}</h3>
            <p className="text-sm text-muted-foreground">{book.author}</p>
            <p className="text-sm text-muted-foreground mt-2">
              {Math.floor(book.duration / 60)}:{(book.duration % 60).toString().padStart(2, "0")} min
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default BookCard;
