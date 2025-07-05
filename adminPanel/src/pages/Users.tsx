import React, { useState } from 'react';
import UserTable, { type User } from '../components/users/UserTable';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

// Mock user data
const mockUsers: User[] = [
  {
    id: 1,
    email: 'alice@example.com',
    favBooks: ['Book 1', 'Book 2', 'Book 3'],
    playedBooks: 5,
  },
  {
    id: 2,
    email: 'bob@example.com',
    favBooks: ['Book 4'],
    playedBooks: 2,
  },
  {
    id: 3,
    email: 'charlie@example.com',
    favBooks: ['Book 2', 'Book 5', 'Book 6', 'Book 7'],
    playedBooks: 8,
  },
];

const Users: React.FC = () => {
  const [search, setSearch] = useState('');
  const filteredUsers = mockUsers.filter(user =>
    user.email.toLowerCase().includes(search.toLowerCase())
  );
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