import React, { useState, Suspense } from 'react';
const BookTable = React.lazy(() => import('../components/books/BookTable'));
const BookDetailsDialog = React.lazy(() => import('../components/books/BookDetailsDialog'));
import BookDetailsDialogSkeleton from '@/skeleton/BookDetailsDialogSkeleton';
import BookTableSkeleton from '@/skeleton/BookTableSkeleton';
import { bookData } from '@/data/bookData';
import type { AdminBook } from '../components/books/BookTable';

// Map bookData to add missing fields for admin panel table
const books: AdminBook[] = bookData.map((b) => ({
  ...b,
  plays: b.reviews || Math.floor(Math.random() * 10000) + 1000, // fallback to reviews or random
  createdBy: 'Admin', // or use a real field if available
  active: true // or use a real field if available
}));

const Books: React.FC = () => {
  const [selectedBook, setSelectedBook] = useState<AdminBook | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleViewDetails = (book: AdminBook) => {
    setSelectedBook(book);
    setDialogOpen(true);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Bookings Management</h1>
      <div className="rounded-lg shadow p-4">
        <Suspense fallback={<BookTableSkeleton />}>
          <BookTable books={books} onViewDetails={handleViewDetails} />
        </Suspense>
      </div>
      <Suspense fallback={<BookDetailsDialogSkeleton />}>
        <BookDetailsDialog open={dialogOpen} onClose={() => setDialogOpen(false)} book={selectedBook} />
      </Suspense>
    </div>
  );
};

export default Books;