import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CardContainer, CardBody, CardItem } from "../ui/3d-card";

type LibraryBookCardProps = {
  book: {
    _id: string;
    userId: string;
    bookId: {
      _id: string;
      title: string;
      author: string;
      coverImage: string;
      description: string;
      rating: number;
      reviews: number;
    };
    createdAt: string;
    updatedAt: string;
    formattedDate: string;
    id: string;
  };
};

const LibraryBookCard = ({ book }: LibraryBookCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/book/${book.bookId._id}`);
  };

  return (
    <div className="w-full h-full">
      <CardContainer className="w-full h-full">
        <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full h-full rounded-xl p-6">
          <CardItem translateZ="100" className="w-full mt-4">
            <div className="aspect-square w-full overflow-hidden rounded-xl relative">
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}${
                  book.bookId.coverImage
                }`}
                className="w-full h-full object-cover group-hover/card:shadow-xl"
                alt={`${book.bookId.title} cover`}
              />
            </div>
          </CardItem>

          <CardItem
            translateZ="50"
            className="text-xl font-bold text-neutral-600 dark:text-white mt-4"
          >
            {book.bookId.title}
          </CardItem>

          <CardItem
            as="p"
            translateZ="60"
            className="text-foreground text-sm max-w-sm mt-2"
          >
            by {book.bookId.author}
          </CardItem>
          <CardItem
            as="p"
            translateZ="60"
            className="text-foreground text-sm max-w-sm mt-2 "
          >
            {book.bookId.description.split(" ").slice(0, 10).join(" ")}...
          </CardItem>
          <div className="flex justify-between items-center mt-4">
            <div className="flex items-center gap-2">
              <span className="text-yellow-400">⭐ {book.bookId.rating}</span>
              <span className="text-sm text-gray-500">
                ({book.bookId.reviews} reviews)
              </span>
            </div>
            <CardItem
              translateZ={20}
              as="button"
              onClick={handleClick}
              className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold hover:opacity-90 transition-opacity cursor-pointer hover:scale-110 active:scale-95 shadow-lg hover:shadow-xl dark:hover:shadow-emerald-500/[0.1] flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue <ArrowRight className="w-4 h-4" />
            </CardItem>
          </div>
        </CardBody>
      </CardContainer>
    </div>
  );
};

export default LibraryBookCard;
