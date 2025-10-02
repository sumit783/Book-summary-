import { useEffect, useState } from "react";
import { getUserProfile } from "@/services/api"; // You need to implement this API call
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import EmptyLibrary from "@/components/myLibrary/EmptyLibrary";
import LibraryBookCard from "@/components/myLibrary/LibraryBookCard";

interface User {
  _id: string;
  username: string;
  email: string;
  isActive?: boolean;
  lastLogin?: string;
  createdAt?: string;
  updatedAt?: string;
  formattedDate?: string;
  avatarUrl?: string;
  favoriteBooks?: FavBook[];
}
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

export default function UserProfile() {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const [books, setBooks] = useState<FavBook[]>([]);
  const [, setLoading] = useState(true);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUserProfile();
        setUser(response.data.user);
      } catch (err) {
        setUser(null);
      }
    };
    fetchUser();
  }, []);
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

  if (!user) {
    return <div className="text-center py-20">Loading profile...</div>;
  }

  return (
    <div className="mx-auto py-12 px-4">
      <div className="flex flex-col items-center gap-4">
        <img
          src={user.avatarUrl || "https://avatar.iran.liara.run/public"}
          alt={user.username}
          className="w-24 h-24 rounded-full border-4 border-primary shadow"
        />
        <h2 className="text-2xl font-bold">{user.username}</h2>
        <p className="text-gray-500">{user.email}</p>
        <div className="mt-10 w-full max-w-7xl mx-auto px-4 rounded-lg shadow-md p-4">
        <h3 className="text-xl font-semibold mb-4">Favorite Books</h3>
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
        <button
          className="mt-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/");
            window.location.reload();
          }}
        >
          Logout
        </button>
      </div>

    </div>
  );
}
