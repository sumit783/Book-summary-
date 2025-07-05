import React, { useState } from 'react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../ui/table';
import type { Book as SharedBook } from '@/type/bookType';
import { Button } from '../ui/button';
import BookDetailsDialog from './BookDetailsDialog';
import EditBookDialog from './EditBookDialog';
import DeleteBookConfirmDialog from './DeleteBookConfirmDialog';

type AdminBook = SharedBook & {
  plays: number;
  createdBy: string;
  active: boolean;
};

interface BookTableProps {
  books: AdminBook[];
  onEditBook?: (book: AdminBook, updated: any) => void;
  onDeleteBook?: (book: AdminBook) => void;
}

const BookTable: React.FC<BookTableProps> = ({ books, onEditBook, onDeleteBook }) => {
  const [selectedBook, setSelectedBook] = useState<AdminBook | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editForm, setEditForm] = useState<{
    title: string;
    author: string;
    description: string;
    summary: string;
    metaTitle: string;
    metaDescription: string;
    metaKeywords: string;
    genre: string;
    categories: string[];
    affiliateLink: string;
    coverImage?: File | undefined;
    coverImageUrl?: string;
  }>({
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
    coverImage: undefined,
    coverImageUrl: '',
  });

  const handleViewDetails = (book: AdminBook) => {
    setSelectedBook(book);
    setDialogOpen(true);
  };

  const handleEditFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedBook && onEditBook) {
      onEditBook(selectedBook, editForm);
    }
    setEditDialogOpen(false);
  };

  const handleEditImageChange = (file: File | null, url: string | null) => {
    setEditForm((prev) => ({ ...prev, coverImage: file || undefined, coverImageUrl: url || '' }));
  };

  const handleEditCategoriesChange = (categories: string[]) => {
    setEditForm((prev) => ({ ...prev, categories }));
  };

  const handleDeleteConfirm = () => {
    if (selectedBook && onDeleteBook) {
      onDeleteBook(selectedBook);
    }
    setDeleteDialogOpen(false);
    setDialogOpen(false);
  };

  return (
    <div className="rounded-2xl shadow-xl bg-white dark:bg-neutral-900 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
      <Table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-800 overflow-hidden">
        <TableHeader>
          <TableRow className="bg-gradient-to-r from-primary/10 to-secondary/10">
            <TableHead className="py-3 px-4 text-lg font-bold text-primary">Cover</TableHead>
            <TableHead className="py-3 px-4 text-lg font-bold text-primary">Title</TableHead>
            <TableHead className="py-3 px-4 text-lg font-bold text-primary">Plays</TableHead>
            <TableHead className="py-3 px-4 text-lg font-bold text-primary">Created By</TableHead>
            <TableHead className="py-3 px-4 text-lg font-bold text-primary">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {books.map((book, idx) => (
            <TableRow
              key={book.id}
              className={
                idx % 2 === 0
                  ? 'bg-gray-50 dark:bg-neutral-800 hover:bg-primary/5 dark:hover:bg-primary/10 hover:scale-[1.02] transition-all duration-200 cursor-pointer'
                  : 'bg-white dark:bg-neutral-900 hover:bg-primary/5 dark:hover:bg-primary/10 hover:scale-[1.02] transition-all duration-200 cursor-pointer'
              }
              onClick={() => handleViewDetails(book)}
            >
              <TableCell className="py-3 md:px-6">
                <img src={book.coverImage} alt={book.title} className="w-14 h-20 object-cover rounded-lg shadow-md border border-gray-200 dark:border-neutral-800" />
              </TableCell>
              <TableCell className="py-3 px-4 font-semibold text-lg text-foreground">{book.title}</TableCell>
              <TableCell className="py-3 px-4 text-blue-600 dark:text-blue-400 font-bold">{book.plays.toLocaleString()}</TableCell>
              <TableCell className="py-3 px-4 text-sm text-muted-foreground">{book.createdBy}</TableCell>
              <TableCell className="py-3 px-4">
                <Button
                  variant="outline"
                  className="px-4 py-2 rounded-xl font-semibold shadow hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleViewDetails(book);
                  }}
                >
                  View Details
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <BookDetailsDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        book={selectedBook}
        onEdit={() => {
          if (selectedBook) {
            setEditForm({
              title: selectedBook.title,
              author: selectedBook.author,
              description: selectedBook.description || '',
              summary: selectedBook.summary || '',
              metaTitle: selectedBook.metaTitle || '',
              metaDescription: selectedBook.metaDescription || '',
              metaKeywords: selectedBook.metaKeywords || '',
              genre: selectedBook.genre || '',
              categories: selectedBook.categories || [],
              affiliateLink: selectedBook.affiliateLink || '',
              coverImage: undefined,
              coverImageUrl: selectedBook.coverImage || '',
            });
          }
          setDialogOpen(false);
          setEditDialogOpen(true);
        }}
        onDelete={() => { setDialogOpen(false); setDeleteDialogOpen(true); }}
      />
      <EditBookDialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        book={selectedBook}
        form={editForm}
        onFormChange={handleEditFormChange}
        onFormSubmit={handleEditFormSubmit}
        onImageChange={handleEditImageChange}
        onCategoriesChange={handleEditCategoriesChange}
      />
      <DeleteBookConfirmDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
        bookTitle={selectedBook?.title || ''}
      />
    </div>
  );
};

export type { AdminBook };
export default BookTable; 