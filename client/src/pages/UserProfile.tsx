import { useEffect, useState } from "react";
import { getUserProfile } from "@/services/api"; // You need to implement this API call
import type { Book } from "@/type/bookType";
import { useNavigate } from "react-router-dom";

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
  favoriteBooks?: Book[];
}

export default function UserProfile() {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

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

  if (!user) {
    return <div className="text-center py-20">Loading profile...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <div className="flex flex-col items-center gap-4">
        <img
          src={user.avatarUrl || "/default-avatar.png"}
          alt={user.username}
          className="w-24 h-24 rounded-full border-4 border-primary shadow"
        />
        <h2 className="text-2xl font-bold">{user.username}</h2>
        <p className="text-gray-500">{user.email}</p>
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

      {user.favoriteBooks && user.favoriteBooks.length > 0 && (
        <div className="mt-10">
          <h3 className="text-xl font-semibold mb-4">Favorite Books</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {user.favoriteBooks.map((book) => (
              <div key={book.id} className="p-4 border rounded-lg flex gap-4 items-center">
                <img src={book.coverImage} alt={book.title} className="w-16 h-20 object-cover rounded" />
                <div>
                  <div className="font-bold">{book.title}</div>
                  <div className="text-sm text-gray-500">{book.author}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
