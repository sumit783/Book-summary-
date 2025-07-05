import React, { useRef, useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { UploadCloud, X } from 'lucide-react';
import type { AdminBook } from './BookTable';

interface EditBookDialogProps {
  open: boolean;
  onClose: () => void;
  book: AdminBook | null;
  form: {
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
    coverImage?: File | null;
    coverImageUrl?: string;
  };
  onFormChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onFormSubmit: (e: React.FormEvent) => void;
  onImageChange?: (file: File | null, url: string | null) => void;
  onCategoriesChange?: (categories: string[]) => void;
}

const EditBookDialog: React.FC<EditBookDialogProps> = ({ open, onClose, book, form, onFormChange, onFormSubmit, onImageChange, onCategoriesChange }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [newCategory, setNewCategory] = useState('');

  useEffect(() => {
    // Optionally, reset file input if book changes
    if (fileInputRef.current) fileInputRef.current.value = '';
  }, [book]);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file && onImageChange) {
      const url = URL.createObjectURL(file);
      onImageChange(file, url);
    } else if (onImageChange) {
      onImageChange(null, null);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0] || null;
    if (file && onImageChange) {
      const url = URL.createObjectURL(file);
      onImageChange(file, url);
    }
  };

  const handleAddCategory = () => {
    if (newCategory.trim() && onCategoriesChange) {
      onCategoriesChange([...form.categories, newCategory.trim()]);
      setNewCategory('');
    }
  };

  const handleRemoveCategory = (index: number) => {
    if (onCategoriesChange) {
      onCategoriesChange(form.categories.filter((_, i) => i !== index));
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddCategory();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="max-w-lg w-full overflow-y-auto max-h-[90vh] p-0 bg-gradient-to-br from-white/80 via-indigo-100/80 to-purple-100/80 dark:from-neutral-900/90 dark:via-indigo-950/80 dark:to-purple-950/80 shadow-2xl border-2 border-primary/20 backdrop-blur-xl scrollbar-none custom-scrollbar-hide rounded-3xl"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <div className="p-8">
          <DialogHeader>
            <DialogTitle className="text-2xl font-extrabold text-primary drop-shadow mb-4 tracking-tight text-center">Edit Book</DialogTitle>
          </DialogHeader>
          <form onSubmit={onFormSubmit} className="space-y-6">
            {/* Cover Image Upload */}
            <div className="flex flex-col items-center gap-3">
              <label
                htmlFor="coverImage"
                className="w-40 h-60 flex flex-col items-center justify-center border-2 border-dashed border-primary/40 rounded-xl bg-white/70 dark:bg-neutral-900/60 cursor-pointer hover:border-primary/80 transition-all relative overflow-hidden group shadow-lg hover:shadow-2xl"
                onDrop={handleDrop}
                onDragOver={e => e.preventDefault()}
              >
                {form.coverImageUrl ? (
                  <img src={form.coverImageUrl} alt="Cover Preview" className="w-full h-full object-cover rounded-xl transition-all duration-200" />
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-primary/60 group-hover:text-primary">
                    <UploadCloud className="w-10 h-10 mb-2" />
                    <span className="text-sm font-semibold">Upload Cover Image</span>
                    <span className="text-xs text-muted-foreground">(Click or Drag & Drop)</span>
                  </div>
                )}
                <input
                  id="coverImage"
                  name="coverImage"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleImageSelect}
                />
              </label>
              {form.coverImageUrl && (
                <Button type="button" variant="ghost" size="sm" onClick={() => onImageChange && onImageChange(null, null)}>
                  Remove Image
                </Button>
              )}
            </div>
            <div className="space-y-3">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Title</label>
              <Input id="title" name="title" placeholder="Title" value={form.title} onChange={onFormChange} required className="rounded-xl shadow-sm focus:ring-2 focus:ring-primary/30" />
              <label htmlFor="author" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Author</label>
              <Input id="author" name="author" placeholder="Author" value={form.author} onChange={onFormChange} required className="rounded-xl shadow-sm focus:ring-2 focus:ring-primary/30" />
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Description</label>
              <textarea id="description" name="description" placeholder="Description" value={form.description} onChange={onFormChange} className="w-full p-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-primary/30 min-h-[80px] resize-none" rows={3} required />
              <label htmlFor="summary" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Summary</label>
              <textarea id="summary" name="summary" placeholder="Summary" value={form.summary} onChange={onFormChange} className="w-full p-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-primary/30 min-h-[80px] resize-none" rows={3} required />
              <label htmlFor="metaTitle" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Meta Title</label>
              <Input id="metaTitle" name="metaTitle" placeholder="Meta Title" value={form.metaTitle} onChange={onFormChange} className="rounded-xl shadow-sm focus:ring-2 focus:ring-primary/30" />
              <label htmlFor="metaDescription" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Meta Description</label>
              <textarea id="metaDescription" name="metaDescription" placeholder="Meta Description" value={form.metaDescription} onChange={onFormChange} className="w-full p-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-primary/30 min-h-[60px] resize-none" rows={2} />
              <label htmlFor="metaKeywords" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Meta Keywords</label>
              <Input id="metaKeywords" name="metaKeywords" placeholder="Meta Keywords" value={form.metaKeywords} onChange={onFormChange} className="rounded-xl shadow-sm focus:ring-2 focus:ring-primary/30" />
              <label htmlFor="genre" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Genre</label>
              <Input id="genre" name="genre" placeholder="Genre" value={form.genre} onChange={onFormChange} className="rounded-xl shadow-sm focus:ring-2 focus:ring-primary/30" />
              
              {/* Categories */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Categories</label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add category"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="rounded-xl shadow-sm focus:ring-2 focus:ring-primary/30"
                  />
                  <Button type="button" onClick={handleAddCategory} className="rounded-xl">Add</Button>
                </div>
                {form.categories.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {form.categories.map((category, index) => (
                      <span key={index} className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                        {category}
                        <button
                          type="button"
                          onClick={() => handleRemoveCategory(index)}
                          className="ml-1 hover:text-red-500"
                          aria-label={`Remove category ${category}`}
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
              
              <label htmlFor="affiliateLink" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Affiliate Link</label>
              <Input id="affiliateLink" name="affiliateLink" placeholder="Affiliate Link" value={form.affiliateLink} onChange={onFormChange} className="rounded-xl shadow-sm focus:ring-2 focus:ring-primary/30" />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="ghost" onClick={onClose} className="rounded-xl">Cancel</Button>
              <Button type="submit" variant="secondary" className="rounded-xl font-bold shadow-md hover:shadow-xl">Save</Button>
            </div>
          </form>
        </div>
        <style>{`
          .custom-scrollbar-hide::-webkit-scrollbar { display: none; }
        `}</style>
      </DialogContent>
    </Dialog>
  );
};

export default EditBookDialog; 