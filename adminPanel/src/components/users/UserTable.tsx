import React, { useState } from 'react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../ui/table';
import UserDetailsDialog from './UserDetailsDialog';

interface User {
  id: number;
  email: string;
  favBooks: string[];
  playedBooks: number;
}

interface UserTableProps {
  users: User[];
}

const UserTable: React.FC<UserTableProps> = ({ users }) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleViewDetails = (user: User) => {
    setSelectedUser(user);
    setDialogOpen(true);
  };

  return (
    <div className="rounded-2xl shadow-xl bg-white dark:bg-neutral-900 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
      <Table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-800 overflow-hidden">
        <TableHeader>
          <TableRow className="bg-gradient-to-r from-primary/10 to-secondary/10">
            <TableHead className="py-3 px-4 text-lg font-bold text-primary">Sr No</TableHead>
            <TableHead className="py-3 px-4 text-lg font-bold text-primary">Email ID</TableHead>
            <TableHead className="py-3 px-4 text-lg font-bold text-primary">Fav List Book Count</TableHead>
            <TableHead className="py-3 px-4 text-lg font-bold text-primary">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user, idx) => (
            <TableRow
              key={user.id}
              className={
                idx % 2 === 0
                  ? 'bg-gray-50 dark:bg-neutral-800 hover:bg-primary/5 dark:hover:bg-primary/10 hover:scale-[1.02] transition-all duration-200 cursor-pointer'
                  : 'bg-white dark:bg-neutral-900 hover:bg-primary/5 dark:hover:bg-primary/10 hover:scale-[1.02] transition-all duration-200 cursor-pointer'
              }
            >
              <TableCell className="py-3 px-4 text-center font-semibold">{idx + 1}</TableCell>
              <TableCell className="py-3 px-4 text-center">{user.email}</TableCell>
              <TableCell className="py-3 px-4 text-center">{user.favBooks.length}</TableCell>
              <TableCell className="py-3 px-4 text-center">
                <button
                  className="px-4 py-2 rounded-xl font-semibold shadow hover:shadow-lg transition-all duration-200 bg-primary text-primary-foreground hover:bg-primary/90"
                  onClick={() => handleViewDetails(user)}
                >
                  View Details
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <UserDetailsDialog open={dialogOpen} onClose={() => setDialogOpen(false)} user={selectedUser} />
    </div>
  );
};

export type { User };
export default UserTable; 