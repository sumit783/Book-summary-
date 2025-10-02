import type{ Book } from "@/type/bookType";
import { useState, useEffect } from "react";
import { toast } from "sonner";

function Header({ book }: { book: Book | undefined }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      if (!book) return;
      
      const token = localStorage.getItem('token');
      if (!token) {
        setIsFavorite(false);
        return;
      }

      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/checkFavBook`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            bookId: book.id
          })
        });

        const data = await response.json();
        
        if (data.success && data.favBook) {
          setIsFavorite(true);
        } else {
          setIsFavorite(false);
        }
      } catch (error) {
        console.error('Error checking favorite status:', error);
        setIsFavorite(false);
      }
    };

    checkFavoriteStatus();
  }, [book]);

  if (!book) {
    return <div className="text-center text-red-500">Book not found</div>;
  }

  const handleBuyNow = () => {
    window.open(book.affiliateLink, "_blank");
  };

  const handleToggleFavorite = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Please login to add books to your library');
      return;
    }

    setLoading(true);
         try {
       // Add to favorites
       const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/books/fav`, {
         method: 'POST',
         headers: {
           'Authorization': `Bearer ${token}`,
           'Content-Type': 'application/json'
         },
         body: JSON.stringify({
           bookId: book.id
         })
       });

      const data = await response.json();
      if (data.success) {
        setIsFavorite(true);
        toast.success('Added to your library');
      } else {
        toast.error(data.message || 'Failed to add to library');
      }
    } catch (error) {
      console.error('Error adding to favorites:', error);
      toast.error('Failed to add to library');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFavorite = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Please login to remove books from your library');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/removeFavBook`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          bookId: book.id
        })
      });

             const data = await response.json();
       if (data.success) {
         setIsFavorite(false);
         console.log('Removed from your library');
         toast.success('Removed from your library');
       } else {
        toast.error(data.message || 'Failed to remove from library');
      }
    } catch (error) {
      console.error('Error removing from favorites:', error);
      toast.error('Failed to remove from library');
    } finally {
      setLoading(false);
    }
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
            {isFavorite ? (
              <>
                <button 
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 hover:scale-105 transition"
                  disabled={loading}
                >
                  My Favorite Book
                </button>
                <button 
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 hover:scale-105 transition"
                  onClick={handleRemoveFavorite}
                  disabled={loading}
                >
                  {loading ? 'Removing...' : 'Remove from Library'}
                </button>
              </>
            ) : (
              <button 
                className="border border-gray-300 px-4 py-2 rounded-lg hover:scale-105 transition"
                onClick={handleToggleFavorite}
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Add to Library'}
              </button>
            )}
          </div>
        </div>
      </div>
  )
}

export default Header