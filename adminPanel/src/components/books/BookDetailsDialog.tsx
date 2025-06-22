import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import type { AdminBook } from './BookTable';

interface BookDetailsDialogProps {
  open: boolean;
  onClose: () => void;
  book: AdminBook | null;
}

const BookDetailsDialog: React.FC<BookDetailsDialogProps> = ({ open, onClose, book }) => {
  if (!open || !book) return null;
  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="overflow-y-auto max-h-[90vh] p-0 bg-gradient-to-br from-white via-indigo-50 to-purple-50 dark:from-neutral-900 dark:via-indigo-950 dark:to-purple-950">
        <div className="rounded-2xl shadow-xl p-6 max-w-2xl mx-auto">
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
          <p className="text-gray-700 dark:text-gray-200 mt-4 text-center md:text-left text-base leading-relaxed">{book.description}</p>
          {book.summary && (
            <div className="w-full mt-6 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl p-4 shadow-inner">
              <h3 className="text-lg font-bold text-primary mb-2">Summary</h3>
              <p className="text-gray-700 dark:text-gray-200 text-sm whitespace-pre-line">{book.summary}</p>
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
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookDetailsDialog; 