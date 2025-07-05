import React from 'react';

interface User {
  id: number;
  email: string;
  favBooks: string[];
  playedBooks: number;
}

interface UserDetailsDialogProps {
  open: boolean;
  onClose: () => void;
  user: User | null;
}

const UserDetailsDialog: React.FC<UserDetailsDialogProps> = ({ open, onClose, user }) => {
  if (!open || !user) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl p-8 w-full max-w-md relative">
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-primary text-xl font-bold"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
        <div className="flex flex-col items-center mb-4">
          <img
            src={`https://avatar.iran.liara.run/public/`}
            alt="User Avatar"
            className="w-24 h-24 rounded-full border-4 border-primary shadow mb-2"
          />
          <h2 className="text-2xl font-bold text-primary text-center">User Details</h2>
        </div>
        <div className="space-y-4">
          <div className="text-base text-gray-700 dark:text-gray-200">
            <span className="font-semibold">Email:</span> {user.email}
          </div>
          <div className="text-base text-gray-700 dark:text-gray-200">
            <span className="font-semibold">Number of Favorite Books:</span> {user.favBooks.length}
          </div>
          <div className="text-base text-gray-700 dark:text-gray-200">
            <span className="font-semibold">Number of Played Books:</span> {user.playedBooks}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsDialog; 