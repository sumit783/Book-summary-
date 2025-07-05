import React, { useState, Suspense } from 'react';
const BookTable = React.lazy(() => import('../components/books/BookTable'));
import BookTableSkeleton from '@/skeleton/BookTableSkeleton';
import { bookData } from '@/data/bookData';
import type { AdminBook } from '../components/books/BookTable';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus } from 'lucide-react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import AddBookDialog from '../components/books/AddBookDialog';

// Map bookData to add missing fields for admin panel table
const initialBooks: AdminBook[] = bookData.map((b) => ({
  ...b,
  plays: b.reviews || Math.floor(Math.random() * 10000) + 1000, // fallback to reviews or random
  createdBy: 'Admin', // or use a real field if available
  active: true // or use a real field if available
}));

const ITEMS_PER_PAGE = 8;

const Books: React.FC = () => {
  const [books, setBooks] = useState<AdminBook[]>(initialBooks);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [form, setForm] = useState({
    title: '',
    author: '',
    description: '',
    summary: '',
    metaTitle: '',
    metaDescription: '',
    metaKeywords: '',
    genre: '',
    categories: [] as string[],
    affiliateLink: '',
  });

  const handleAddBook = () => {
    setAddDialogOpen(true);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCategoriesChange = (categories: string[]) => {
    setForm({ ...form, categories });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement add book logic
    setAddDialogOpen(false);
  };

  // Edit book handler
  const handleEditBook = (book: AdminBook, updated: any) => {
    setBooks((prev) =>
      prev.map((b) =>
        b.id === book.id
          ? {
              ...b,
              ...updated,
              coverImage: updated.coverImageUrl || b.coverImage,
            }
          : b
      )
    );
  };

  // Delete book handler
  const handleDeleteBook = (book: AdminBook) => {
    setBooks((prev) => prev.filter((b) => b.id !== book.id));
  };

  // Filter books based on search query
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredBooks.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentBooks = filteredBooks.slice(startIndex, endIndex);

  // Reset to first page when search query changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 dark:from-neutral-900 dark:via-indigo-950 dark:to-purple-950 py-8 px-2 flex flex-col items-center">
      <div className="w-full md:max-w-6xl mx-auto glass-card rounded-3xl shadow-2xl border border-primary/10 backdrop-blur-xl p-2 md:p-8">
        <div className='flex justify-between items-center mb-8'>
          <h1 className="text-4xl font-extrabold text-primary drop-shadow tracking-tight text-center">Books Management</h1>
          {/* Search and Add Book Section */}
          <div className='hidden md:block'>
          <Button
            onClick={handleAddBook}
            variant="secondary"
            className=" font-extrabold px-6 py-3 rounded-xl flex items-center gap-3 transition-all shadow-lg ring-2 ring-primary/20 hover:ring-primary/40 hover:scale-105 hover:shadow-2xl focus:ring-4 focus:ring-primary/30 focus:outline-none duration-200"
          >
            <Plus className="h-5 w-5" />
            Add Book
          </Button>
          </div>
        </div>
        <div className="flex md:hidden justify-end mb-4">
          <Button
            onClick={handleAddBook}
            variant="secondary"
            className="font-extrabold px-6 py-3 rounded-xl flex items-center gap-3 transition-all shadow-lg ring-2 ring-primary/20 hover:ring-primary/40 hover:scale-105 hover:shadow-2xl focus:ring-4 focus:ring-primary/30 focus:outline-none duration-200"
          >
            <Plus className="h-5 w-5" />
            Add Book
          </Button>
        </div>
        <AddBookDialog
          open={addDialogOpen}
          onClose={() => setAddDialogOpen(false)}
          form={form}
          onFormChange={handleFormChange}
          onFormSubmit={handleFormSubmit}
          onCategoriesChange={handleCategoriesChange}
        />
        <div className="flex md:flex-row items-center gap-4 mb-8 bg-white/70 dark:bg-neutral-900/80 rounded-2xl shadow-lg p-4 border border-primary/10">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search by book title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-3 border border-gray-300 dark:border-neutral-700 rounded-xl focus:ring-2 focus:ring-primary/40 focus:border-primary text-lg bg-white/80 dark:bg-neutral-800/80 shadow-sm"
            />
          </div>
          
        </div>
        <div className="rounded-2xl shadow-xl p-6 bg-white/80 dark:bg-neutral-900/80 border border-primary/10">
          <Suspense fallback={<BookTableSkeleton />}>
            <BookTable
              books={currentBooks}
              onEditBook={handleEditBook}
              onDeleteBook={handleDeleteBook}
            />
          </Suspense>
        </div>
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-col items-center mt-8 gap-4">
            <div className="text-base text-muted-foreground font-medium">
              Showing {startIndex + 1} to {Math.min(endIndex, filteredBooks.length)} of {filteredBooks.length} books
            </div>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                    className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                  />
                </PaginationItem>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                  if (
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1)
                  ) {
                    return (
                      <PaginationItem key={page}>
                        <PaginationLink
                          onClick={() => handlePageChange(page)}
                          className={`cursor-pointer text-lg font-semibold rounded-lg px-3 py-1 transition-colors ${
                            page === currentPage
                              ? 'bg-primary text-primary-foreground shadow'
                              : 'hover:bg-primary/10'
                          }`}
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  } else if (
                    page === currentPage - 2 ||
                    page === currentPage + 2
                  ) {
                    return (
                      <PaginationItem key={page}>
                        <PaginationEllipsis />
                      </PaginationItem>
                    );
                  }
                  return null;
                })}
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                    className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </div>
  );
};

export default Books;