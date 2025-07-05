import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface DeleteBookConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  bookTitle: string;
}

const DeleteBookConfirmDialog: React.FC<DeleteBookConfirmDialogProps> = ({ open, onClose, onConfirm, bookTitle }) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md w-full p-0 bg-gradient-to-br from-white/90 via-red-50/90 to-red-100/90 dark:from-neutral-900/90 dark:via-red-950/80 dark:to-red-950/80 shadow-2xl border-2 border-red-200/40 backdrop-blur-xl rounded-2xl">
        <div className="p-8 text-center">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-red-700 dark:text-red-400 mb-2">Delete Book</DialogTitle>
          </DialogHeader>
          <p className="text-base text-gray-700 dark:text-gray-200 mb-6">Are you sure you want to delete <span className="font-semibold text-red-700 dark:text-red-400">{bookTitle}</span>? This action cannot be undone.</p>
          <div className="flex justify-center gap-4">
            <Button variant="ghost" onClick={onClose} className="rounded-xl">Cancel</Button>
            <Button variant="destructive" onClick={onConfirm} className="rounded-xl font-bold shadow-md hover:shadow-xl">Delete</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteBookConfirmDialog; 