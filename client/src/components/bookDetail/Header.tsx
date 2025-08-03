import type{ Book } from "@/type/bookType";

function Header({ book }: { book: Book | undefined }) {
  if (!book) {
    return <div className="text-center text-red-500">Book not found</div>;
  }
  const handleBuyNow = () => {
    window.open(book.affiliateLink, "_blank");
  };
  return (
    <div className="w-full flex flex-col items-center md:flex-row gap-6">
        <div className="w-full md:w-1/3 overflow-hidden rounded-lg shadow-lg">
          <img
            src={book?.coverImage}
            alt={`${book?.title} cover`}
            className="w-full h-auto rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 object-cover"
            loading="lazy"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4">{book?.title}</h1>
          <p className="text-lg text-foreground mb-2">by {book?.author}</p>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-yellow-400 text-lg">⭐ {book?.rating}</span>
            <span className="text-sm text-foreground">({book?.reviews} reviews)</span>
          </div>
          <p className="text-foreground mb-4">{book?.description}</p>
          <div className="flex gap-4">
            <button className="bg-blue-500 font-semibold text-white px-4 py-2 rounded-lg hover:bg-blue-600 hover:scale-105  transition" onClick={handleBuyNow}>
             Buy Now
            </button>
            <button className="border border-gray-300 px-4 py-2 rounded-lg transition hover:scale-105">
              Add to Library
            </button>
          </div>
        </div>
      </div>
  )
}

export default Header