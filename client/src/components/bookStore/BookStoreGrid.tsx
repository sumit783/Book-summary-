import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";
import type { Book } from "@/type/bookType";
import { useNavigate } from "react-router-dom";

// Modern, animated, attractive card grid

type BookStoreGridProps = {
  books: Book[];
}

const BookStoreGrid = ({ books }: BookStoreGridProps) => {
  const navigate = useNavigate();
  const handleClick = (book: Book) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    navigate(`/book/${book.id}`);
}
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-14 justify-center">
      {books.map((book, idx) => (
        <div
          key={idx}
          className="flex-none w-[300px] mx-auto h-full my-auto snap-center"
        >
          <CardContainer className="w-full h-full">
            <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full h-full rounded-xl p-6">
              <CardItem translateZ="100" className="w-full mt-4">
                <div className="aspect-square w-full overflow-hidden rounded-xl">
                  <img
                    src={book.coverImage}
                    className="w-full h-full object-cover group-hover/card:shadow-xl"
                    alt={`${book.title} cover`}
                  />
                </div>
              </CardItem>
              <CardItem
                translateZ="50"
                className="text-xl font-bold text-neutral-600 dark:text-white mt-4"
              >
                {book.title}
              </CardItem>
              <CardItem
                as="p"
                translateZ="60"
                className="text-foreground text-sm max-w-sm mt-2 "
              >
                {book.description}
              </CardItem>

              <div className="flex justify-between items-center mt-4">
                <div className="flex items-center gap-2">
                  <span className="text-yellow-400">⭐ {book.rating}</span>
                  <span className="text-sm text-gray-500">
                    ({book.reviews} reviews)
                  </span>
                </div>
                <CardItem
                  translateZ={20}
                  as="button"
                  onClick={() => handleClick(book)}
                  className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold hover:opacity-90 transition-opacity cursor-pointer hover:scale-110 active:scale-95 shadow-lg hover:shadow-xl dark:hover:shadow-emerald-500/[0.1] flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  View Detail
                </CardItem>
              </div>
            </CardBody>
          </CardContainer>
        </div>
      ))}
      {books.length === 0 && (
        <div className="col-span-full text-center text-lg text-gray-500 py-12">
          No books found.
        </div>
      )}
    </div>
  );
};

export default BookStoreGrid;
