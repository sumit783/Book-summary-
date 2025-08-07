import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import type { AdminBook } from './BookTable';
import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';

interface BookDetailsDialogProps {
  open: boolean;
  onClose: () => void;
  book: AdminBook | null;
  onEdit?: (book: AdminBook) => void;
  onDelete?: (book: AdminBook) => void;
  deleteLoading?: boolean;
}

const BookDetailsDialog: React.FC<BookDetailsDialogProps> = ({ open, onClose, book, onEdit, onDelete, deleteLoading }) => {
  if (!open || !book) return null;
  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent
        className="overflow-y-auto max-h-[90vh] p-0 bg-gradient-to-br from-white via-indigo-50 to-purple-50 dark:from-neutral-900 dark:via-indigo-950 dark:to-purple-950 scrollbar-none custom-scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <div className="rounded-2xl shadow-xl p-6 w-full mx-auto relative">
          {/* Edit and Delete Buttons */}
         
          <DialogHeader>
            <DialogTitle className="text-2xl font-extrabold text-primary drop-shadow mb-1">{book.title}</DialogTitle>
            <DialogDescription className="text-base text-muted-foreground mb-2">by {book.author}</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col md:flex-row items-center gap-6 mt-2">
            <img src={book.coverImage} alt={book.title} className="w-32 h-48 object-cover rounded-xl shadow-lg border-2 border-primary/20" />
            <div className="flex-1 flex flex-col gap-2 items-center md:items-start">
              <p className="text-sm text-muted-foreground">Created by: <span className="font-semibold text-foreground">{book.createdBy}</span></p>
              <p className="text-sm text-muted-foreground">Plays: <span className="font-semibold text-blue-600 dark:text-blue-400">{book.plays.toLocaleString()}</span></p>
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mt-2 ${book.active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{book.active ? 'Active' : 'Inactive'}</span>
            </div>
          </div>
          {book.description && (
            <div className="w-full mt-6 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl p-4 shadow-inner">
              <h3 className="text-lg font-bold text-primary mb-2">Description</h3>
              <p className="text-gray-700 dark:text-gray-200 text-sm whitespace-pre-line">{book.description}</p>
            </div>
          )}
          {book.summary && (
            <div className="w-full mt-6 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl p-4 shadow-inner">
              <h3 className="text-lg font-bold text-primary mb-2">Summary</h3>
              <p className="text-gray-700 dark:text-gray-200 text-sm whitespace-pre-line">{book.summary}</p>
            </div>
          )}
          {book.genre && (
            <div className="w-full mt-6 bg-gradient-to-r from-blue-100/40 to-purple-100/40 dark:from-blue-900/40 dark:to-purple-900/40 rounded-xl p-4 shadow-inner">
              <h3 className="text-lg font-bold text-blue-700 dark:text-blue-300 mb-2">Genre</h3>
              <p className="text-gray-700 dark:text-gray-200 text-sm">{book.genre}</p>
            </div>
          )}
          {book.categories && book.categories.length > 0 && (
            <div className="w-full mt-6 bg-gradient-to-r from-green-100/40 to-blue-100/40 dark:from-green-900/40 dark:to-blue-900/40 rounded-xl p-4 shadow-inner">
              <h3 className="text-lg font-bold text-green-700 dark:text-green-300 mb-2">Categories</h3>
              <div className="flex flex-wrap gap-2">
                {book.categories.map((category, index) => (
                  <span key={index} className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                    {category}
                  </span>
                ))}
              </div>
            </div>
          )}
          {book.metaKeywords && (
            <div className="w-full mt-6 bg-gradient-to-r from-yellow-100/40 to-orange-100/40 dark:from-yellow-900/40 dark:to-orange-900/40 rounded-xl p-4 shadow-inner">
              <h3 className="text-lg font-bold text-yellow-700 dark:text-yellow-300 mb-2">Meta Keywords</h3>
              <p className="text-gray-700 dark:text-gray-200 text-sm">{book.metaKeywords}</p>
            </div>
          )}
          {book.audioLink && (
            <div className="w-full mt-6 bg-gradient-to-r from-blue-100/40 to-purple-100/40 dark:from-blue-900/40 dark:to-purple-900/40 rounded-xl p-4 shadow-inner">
              <h3 className="text-lg font-bold text-blue-700 dark:text-blue-300 mb-2">Audio</h3>
              <audio controls className="w-full">
                <source src={book.audioLink} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
          )}
           <div className="flex gap-2 z-10 justify-end mt-4">
            {onEdit && (
              <Button
                className="px-3 py-1 rounded-lg bg-blue-100 text-blue-700 font-semibold hover:bg-blue-200 transition"
                onClick={() => onEdit(book)}
                title="Edit Book"
              >
                Edit
              </Button>
            )}
            {onDelete && (
              <Button
                className="px-3 py-1 rounded-lg bg-red-100 text-red-700 font-semibold hover:bg-red-200 transition flex items-center gap-2"
                onClick={() => onDelete(book)}
                title="Delete Book"
                disabled={deleteLoading}
              >
                {deleteLoading ? <Loader2 className="animate-spin w-4 h-4" /> : null}
                Delete
              </Button>
            )}
          </div>
        </div>
        <style>{`
          .custom-scrollbar-hide::-webkit-scrollbar { display: none; }
        `}</style>
      </DialogContent>
    </Dialog>
  );
};

export default BookDetailsDialog; 