import React, { useState, Suspense, useEffect } from 'react';
const BookTable = React.lazy(() => import('../components/books/BookTable'));
import BooksSkeleton from '@/skeleton/BooksSkeleton';
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
import { toast } from 'sonner';
import BookDetailsDialog from '../components/books/BookDetailsDialog';
import EditBookDialog from '../components/books/EditBookDialog';
import DeleteBookConfirmDialog from '../components/books/DeleteBookConfirmDialog';

const ITEMS_PER_PAGE = 8;

const Books: React.FC = () => {
  const [books, setBooks] = useState<AdminBook[]>([]);
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
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<AdminBook | null>(null);
  const [editForm, setEditForm] = useState({
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
    coverImage: null as File | null,
    coverImageUrl: '',
  });
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteConfirmDialogOpen, setDeleteConfirmDialogOpen] = useState(false);
  const [bookToDelete, setBookToDelete] = useState<AdminBook | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URI}/api/books/`);
        const data = await response.json();
        if (data.success && Array.isArray(data.books)) {
          console.log("books :",data.books);
          const mappedBooks: AdminBook[] = data.books.map((b: any) => ({
            id: b._id,
            title: b.title,
            author: b.author,
            coverImage: `${import.meta.env.VITE_BASE_URI}${b.coverImage}`,
            description: b.description,
            summary: b.summary,
            metaTitle: b.metaTitle,
            metaDescription: b.metaDescription,
            metaKeywords: b.metaKeywords,
            genre: b.genre,
            categories: b.categories,
            affiliateLink: b.affiliateLink,
            publicationDate: b.publicationDate,
            rating: b.rating,
            reviews: b.reviews,
              audioLink: `${import.meta.env.VITE_BASE_URI}${b.audioUri}`,
            plays: b.reviews || Math.floor(Math.random() * 10000) + 1000,
            createdBy: 'Admin',
            active: true,
          }));
          setBooks(mappedBooks);
        }
      } catch (err) {
        console.log("error :",err);
        toast.error("Error fetching books");
      }
    };
    fetchBooks();
  }, []);

  // Debug useEffect to monitor addDialogOpen state
  useEffect(() => {
    console.log('addDialogOpen state changed to:', addDialogOpen);
  }, [addDialogOpen]);

  const handleAddBook = () => {
    setAddDialogOpen(true);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCategoriesChange = (categories: string[]) => {
    setForm({ ...form, categories });
  };

  const handleImageChange = (file: File | null, url: string | null) => {
    setForm((prev) => ({
      ...prev,
      coverImage: file,
      coverImageUrl: url || '',
    }));
  };

  const fetchBooks = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URI}/api/books/`);
      const data = await response.json();
      if (data.success && Array.isArray(data.books)) {
        console.log("books :", data.books);
        const mappedBooks: AdminBook[] = data.books.map((b: any) => ({
          id: b._id,
          title: b.title,
          author: b.author,
          coverImage: `${import.meta.env.VITE_BASE_URI}${b.coverImage}`,
          description: b.description,
          summary: b.summary,
          metaTitle: b.metaTitle,
          metaDescription: b.metaDescription,
          metaKeywords: b.metaKeywords,
          genre: b.genre,
          categories: b.categories,
          affiliateLink: b.affiliateLink,
          publicationDate: b.publicationDate,
          rating: b.rating,
          reviews: b.reviews,
          audioLink: `${import.meta.env.VITE_BASE_URI}${b.audioUri}`,
          plays: b.reviews || Math.floor(Math.random() * 10000) + 1000,
          createdBy: 'Admin',
          active: true,
        }));
        setBooks(mappedBooks);
      }
    } catch (err) {
      console.log("error :", err);
      toast.error("Error fetching books");
    }
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

  const handleBookAdded = async () => {
    console.log('handleBookAdded called - refreshing books and closing dialog');
    console.log('Current addDialogOpen state:', addDialogOpen);
    await fetchBooks();
    console.log('Books fetched, setting addDialogOpen to false');
    setAddDialogOpen(false);
    console.log('addDialogOpen set to false');
    setForm({
      title: '',
      author: '',
      description: '',
      summary: '',
      metaTitle: '',
      metaDescription: '',
      metaKeywords: '',
      genre: '',
      categories: [],
      affiliateLink: '',
    });
    console.log('Dialog closed and form reset');
  };

  const handleBookEdited = async () => {
    await fetchBooks();
  };

  const openDetailsDialog = (book: AdminBook) => {
    setSelectedBook(book);
    setDetailsDialogOpen(true);
  };

  const handleEditFromDetails = (book: AdminBook) => {
    setSelectedBook(book);
    setEditForm({
      title: book.title,
      author: book.author,
      description: book.description,
      summary: book.summary,
      metaTitle: book.metaTitle,
      metaDescription: book.metaDescription,
      metaKeywords: book.metaKeywords,
      genre: book.genre,
      categories: book.categories || [],
      affiliateLink: book.affiliateLink,
      coverImage: null,
      coverImageUrl: book.coverImage,
    });
    setEditDialogOpen(true);
    setDetailsDialogOpen(false);
  };

  const handleEditFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };
  const handleEditImageChange = (file: File | null, url: string | null) => {
    setEditForm((prev) => ({ ...prev, coverImage: file, coverImageUrl: url || '' }));
  };
  const handleEditCategoriesChange = (categories: string[]) => {
    setEditForm({ ...editForm, categories });
  };

  const handleDeleteBookFromDetails = async (book: AdminBook) => {
    setBookToDelete(book);
    setDeleteConfirmDialogOpen(true);
    setDetailsDialogOpen(false);
  };

  const handleConfirmDelete = async () => {
    if (!bookToDelete) return;
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      toast.error('Not authenticated');
      return;
    }
    setDeleteLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URI}/api/books/${bookToDelete.id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      const data = await response.json();
      if (response.ok && data.success) {
        toast.success(data.message || 'Book deleted successfully!');
        setDeleteConfirmDialogOpen(false);
        setBookToDelete(null);
        await fetchBooks();
      } else {
        throw new Error(data.message || data.error || 'Failed to delete book');
      }
    } catch (err: any) {
      toast.error(err.message || 'Failed to delete book');
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <Suspense fallback={<BooksSkeleton />}>
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
            onClose={() => {
              console.log('AddBookDialog onClose called');
              setAddDialogOpen(false);
              console.log('setAddDialogOpen(false) called');
            }}
            form={form}
            onFormChange={handleFormChange}
            onImageChange={handleImageChange}
            onCategoriesChange={handleCategoriesChange}
            onBookAdded={handleBookAdded}
          />
          <BookDetailsDialog
            open={detailsDialogOpen}
            onClose={() => setDetailsDialogOpen(false)}
            book={selectedBook}
            onEdit={handleEditFromDetails}
            onDelete={handleDeleteBookFromDetails}
            deleteLoading={deleteLoading}
          />
          <EditBookDialog
            open={editDialogOpen}
            onClose={() => setEditDialogOpen(false)}
            book={selectedBook}
            form={editForm}
            onFormChange={handleEditFormChange}
            onImageChange={handleEditImageChange}
            onCategoriesChange={handleEditCategoriesChange}
            onBookEdited={handleBookEdited}
          />
          <DeleteBookConfirmDialog
            open={deleteConfirmDialogOpen}
            onClose={() => {
              setDeleteConfirmDialogOpen(false);
              setBookToDelete(null);
            }}
            onConfirm={handleConfirmDelete}
            bookTitle={bookToDelete?.title || ''}
            loading={deleteLoading}
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
            <BookTable
              books={currentBooks}
              onEditBook={handleEditBook}
              onDeleteBook={handleDeleteBook}
              onViewBook={openDetailsDialog}
            />
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
    </Suspense>
  );
};

export default Books;