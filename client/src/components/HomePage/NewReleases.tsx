import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import type { Book } from "@/type/bookType";
import { Badge } from "../ui/badge";
import { useNavigate } from "react-router-dom";
import { getBooks } from "@/services/api";
import { useEffect, useState } from "react";

function NewReleases() {
  const navigate = useNavigate();
  const [bookData, setBookData] = useState<Book[]>([]);
  useEffect(() => {
    const fetchBooks = async () => {
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
        setBookData(mappedBooks);
      }
    };
    fetchBooks();
  }, []);
  // Get the latest 5 books from bookData
  const newReleases = bookData.slice(0, 5);

  const handleViewClick = (bookId: number) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate(`/book/${bookId}`);
  };

  return (
    <section className="pt-5 pb-10 px-4">
      <div className="container mx-auto text-center">
        <h1 className="text-3xl md:text-5xl font-bold mb-6 text-gradient">
          New Releases
        </h1>
        <p className="text-lg md:text-xl mb-10">
          Discover our latest additions to the library.
        </p>
        <div className="relative">
          <div className="flex gap-8 overflow-x-auto snap-x snap-mandatory custom-scrollbar py-4 px-2">
            {newReleases.map((book: Book, index) => (
              <div key={index} className="flex-none w-[275px] snap-center">
                <Card className="w-full h-full bg-gray-50 dark:bg-black dark:border-white/[0.2] border-black/[0.1] hover:scale-105 transition-transform duration-300 shadow-lg dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] rounded-xl">
                  <CardHeader className="px-4 relative group/card">
                    <div className="absolute inset-0">
                      <Badge className="absolute top-2 right-6 bg-purple-500 text-white px-3 py-1 rounded-bl-lg">
                        New
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
                      <span className="text-yellow-400 text-sm">
                        ⭐ {book.rating}
                      </span>
                      <span className="text-xs text-gray-500">
                        ({book.reviews} reviews)
                      </span>
                    </div>
                    <button
                      onClick={() => handleViewClick(book.id)}
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
      </div>
    </section>
  );
}

export default NewReleases;
