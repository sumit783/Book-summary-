import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import type { Book } from '@/type/bookType';

interface TopPlayedTableDialogProps {
  open: boolean;
  onClose: () => void;
  book: Book | null;
}

const TopPlayedTableDialog: React.FC<TopPlayedTableDialogProps> = ({ open, onClose, book }) => {
  if (!open || !book) return null;
  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent
        className="overflow-y-auto max-h-[90vh] p-0 bg-gradient-to-br from-white/80 via-green-100/80 to-blue-100/80 dark:from-neutral-900/90 dark:via-green-950/80 dark:to-blue-950/80 shadow-2xl border-2 border-primary/20 backdrop-blur-xl scrollbar-none custom-scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <div className="rounded-3xl shadow-2xl p-8 max-w-2xl mx-auto bg-white/80 dark:bg-neutral-900/90 border border-primary/10 relative">
          <DialogHeader>
            <DialogTitle className="text-3xl font-extrabold text-primary drop-shadow mb-1 tracking-tight">{book.title}</DialogTitle>
            <DialogDescription className="text-lg text-muted-foreground mb-2 font-medium">by {book.author}</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col md:flex-row items-center gap-8 mt-4">
            <img src={book.coverImage} alt={book.title} className="w-36 h-52 object-cover rounded-2xl shadow-xl border-2 border-primary/30" />
            <div className="flex-1 flex flex-col gap-3 items-center md:items-start">
              <p className="text-base text-muted-foreground">Genre: <span className="font-semibold text-foreground">{book.genre}</span></p>
              <p className="text-base text-muted-foreground">Plays: <span className="font-semibold text-blue-600 dark:text-blue-400">{book.reviews?.toLocaleString() ?? book.rating}</span></p>
              <span className="inline-block px-4 py-1 rounded-full text-sm font-semibold mt-2 bg-green-100 text-green-700">Top Played</span>
            </div>
          </div>
          <p className="text-gray-700 dark:text-gray-200 mt-6 text-center md:text-left text-lg leading-relaxed font-medium">{book.description}</p>
          {book.summary && (
            <div className="w-full mt-8 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-5 shadow-inner">
              <h3 className="text-xl font-bold text-primary mb-3">Summary</h3>
              <p className="text-gray-700 dark:text-gray-200 text-base whitespace-pre-line">{book.summary}</p>
            </div>
          )}
        </div>
        <style>{`
          .custom-scrollbar-hide::-webkit-scrollbar { display: none; }
        `}</style>
      </DialogContent>
    </Dialog>
  );
};

export default TopPlayedTableDialog; 