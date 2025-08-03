import { useNavigate } from 'react-router-dom';
import type { Book } from '@/type/bookType';
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Badge } from "../ui/badge";

interface RecommendedBooksProps {
  currentBook: Book | undefined;
  allBooks: Book[];
}

const RecommendedBooks = ({ currentBook, allBooks }: RecommendedBooksProps) => {
  const navigate = useNavigate();

  if (!currentBook) return null;

  // Find books with matching categories
  const recommendedBooks = allBooks
    .filter(book => 
      book.id !== currentBook.id && // Exclude current book
      book.categories.some(category => 
        currentBook.categories?.includes(category)
      )
    )
    .slice(0, 3); // Show only 3 recommendations

  if (recommendedBooks.length === 0) return null;

  const handleBookClick = (bookId: number) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    navigate(`/book/${bookId}`);
  };

  return (
    <section className="mt-12">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gradient">
          You May Also Like
        </h2>
        <div className="flex gap-8 overflow-x-auto snap-x snap-mandatory custom-scrollbar py-4 px-2">
          {recommendedBooks.map((book) => (
            <div key={book.id} className="flex-none w-[275px] snap-center">
              <Card className="w-full h-full bg-gray-50 dark:bg-black dark:border-white/[0.2] border-black/[0.1] hover:scale-105 transition-transform duration-300 shadow-lg dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] rounded-xl">
                <CardHeader className="px-4 relative group/card">
                  <div className="absolute inset-0">
                    <Badge className="absolute top-2 right-6 bg-purple-500 text-white px-3 py-1 rounded-bl-lg">
                      Recommended
                    </Badge>
                  </div>
                  <div className="aspect-square w-full overflow-hidden rounded-xl">
                    <img
                      src={book.coverImage}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                      alt={`${book.title} cover`}
                    />
                  </div>
                </CardHeader>
                <CardContent className="px-4">
                  <h3 className="text-base font-bold text-neutral-600 dark:text-white line-clamp-1">
                    {book.title}
                  </h3>
                  <p className="text-neutral-500 text-xs mt-1 dark:text-neutral-300 line-clamp-2">
                    {book.description}
                  </p>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex justify-between items-center">
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-400 text-sm">⭐ {book.rating}</span>
                    <span className="text-xs text-gray-500">({book.reviews} reviews)</span>
                  </div>
                  <button
                    onClick={() => handleBookClick(book.id)}
                    className="px-3 py-1.5 rounded-lg bg-black dark:bg-white dark:text-black text-white text-xs font-bold hover:opacity-90 transition-opacity cursor-pointer hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl dark:hover:shadow-emerald-500/[0.1]"
                  >
                    View
                  </button>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecommendedBooks; 