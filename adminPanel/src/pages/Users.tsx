import React, { useState, useEffect } from 'react';
import UserTable, { type User } from '../components/users/UserTable';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

type ApiUser = {
  _id: string;
  username: string;
  email: string;
  isActive: boolean;
  lastLogin: string;
  createdAt: string;
  updatedAt: string;
  formattedDate: string;
  id: string;
  favBooks: Array<{
    _id: string;
    userId: string;
    bookId: {
      _id: string;
      title: string;
      author: string;
      coverImage: string;
      description: string;
    };
    createdAt: string;
    updatedAt: string;
    formattedDate: string;
    id: string;
  }>;
};

const Users: React.FC = () => {
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const authToken = localStorage.getItem('authToken');
        if (!authToken) {
          toast.error('Not authenticated');
          return;
        }

        const response = await fetch(`${import.meta.env.VITE_BASE_URI}/api/allUsers`, {
          headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.status === 401) {
          toast.error('Session expired. Please login again.');
          localStorage.removeItem('authToken');
          navigate('/login');
          return;
        }

        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }

        const data = await response.json();
        
        if (data.success && data.users) {
          // Transform API data to match UserTable component expectations
          const transformedUsers: User[] = data.users.map((user: ApiUser) => ({
            id: user._id,
            email: user.email,
            favBooks: user.favBooks.map(favBook => favBook.bookId.title),
            playedBooks: user.favBooks.length, // Using favBooks count as playedBooks for now
          }));
          setUsers(transformedUsers);
        } else {
          setUsers([]);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
        toast.error('Failed to load users');
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user =>
    user.email.toLowerCase().includes(search.toLowerCase())
  );
  if (loading) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 dark:from-neutral-900 dark:via-indigo-950 dark:to-purple-950 py-8 px-2 flex flex-col items-center">
        <div className="w-full md:max-w-4xl mx-auto glass-card rounded-3xl shadow-2xl border border-primary/10 backdrop-blur-xl p-2 md:p-8">
          <h1 className="text-4xl font-extrabold mb-8 text-primary drop-shadow tracking-tight text-center">Users Management</h1>
          <div className="flex justify-center items-center mt-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 dark:from-neutral-900 dark:via-indigo-950 dark:to-purple-950 py-8 px-2 flex flex-col items-center">
      <div className="w-full md:max-w-4xl mx-auto glass-card rounded-3xl shadow-2xl border border-primary/10 backdrop-blur-xl p-2 md:p-8">
        <h1 className="text-4xl font-extrabold mb-8 text-primary drop-shadow tracking-tight text-center">Users Management</h1>
        <div className="mb-6 flex justify-center">
          <div className="relative flex-1 w-full md:w-1/2">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search by email..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-12 pr-4 py-3 border border-gray-300 dark:border-neutral-700 rounded-xl focus:ring-2 focus:ring-primary/40 focus:border-primary text-lg bg-white/80 dark:bg-neutral-800/80 shadow-sm"
            />
          </div>
        </div>
        <div className="bg-white/80 dark:bg-neutral-900/80 rounded-2xl shadow-lg p-6 border border-primary/10">
          <UserTable users={filteredUsers} />
        </div>
      </div>
    </div>
  );
};

export default Users;