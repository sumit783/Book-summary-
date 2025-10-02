import MyLibraryHeader from "@/components/myLibrary/MyLibraryHeader";
import LibraryBookCard from "@/components/myLibrary/LibraryBookCard";
import EmptyLibrary from "@/components/myLibrary/EmptyLibrary";
import { useState, useEffect } from "react";
import { toast } from "sonner";

type FavBook = {
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

function MyLibrary() {
  const [books, setBooks] = useState<FavBook[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavBooks = async () => {
      try {
        const authToken = localStorage.getItem('token');
        if (!authToken) {
          toast.error('Please login to view your library');
          return;
        }

        console.log('Fetching favorite books with token:', authToken ? 'Token present' : 'No token');
        console.log('VITE_BASE_URI:', import.meta.env.VITE_BACKEND_URL);
        const apiUrl = `${import.meta.env.VITE_BACKEND_URL}/api/myFavBooks`;
        console.log('Full API URL:', apiUrl);
        
        
        const response = await fetch(apiUrl, {
          headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json'
          }
        });

        console.log('Response status:', response.status);
        console.log('Response headers:', response.headers);

        // Log the raw response text first
        const responseText = await response.text();
        console.log('Raw response text:', responseText);

        if (!response.ok) {
          console.error('Response error:', responseText);
          throw new Error(`Failed to fetch favorite books: ${response.status}`);
        }

        // Try to parse as JSON
        let data;
        try {
          data = JSON.parse(responseText);
        } catch (parseError) {
          console.error('JSON parse error:', parseError);
          console.error('Response was not valid JSON:', responseText);
          throw new Error('Invalid JSON response from server');
        }
        console.log('API Response:', data);
        
        if (data.success && data.favBooks) {
          console.log('Setting books:', data.favBooks);
          setBooks(data.favBooks);
        } else {
          console.log('No books found or invalid response');
          setBooks([]);
        }
      } catch (error) {
        console.error('Error fetching favorite books:', error);
        toast.error('Failed to load your library');
        setBooks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFavBooks();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen py-8 px-4 md:max-w-7xl mx-auto">
        <MyLibraryHeader />
        <div className="flex justify-center items-center mt-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 md:max-w-7xl mx-auto ">
      <MyLibraryHeader />
      {books.length === 0 ? (
        <EmptyLibrary />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-8">
          {books.map((book) => (
            <LibraryBookCard key={book._id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
}

export default MyLibrary;