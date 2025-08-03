import BookStoreHeader from "@/components/bookStore/BookStoreHeader";
import BookStoreCategories from "@/components/bookStore/BookStoreCategories";
import BookStoreGrid from "@/components/bookStore/BookStoreGrid";
import { useState, useMemo, useEffect } from "react";
import { getBooks } from "@/services/api";
import type { Book } from "@/type/bookType";

function BookStore() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [backendBooks, setBackendBooks] = useState<Book[]>([]);

  // Get unique categories from all books
  const allCategories = useMemo(
    () => Array.from(new Set((backendBooks || []).flatMap(book => book.categories))),
    [backendBooks]
  );
  const categories = ["All", ...allCategories];

  // Filter books based on search and selected category
  const filteredBooks = useMemo(() => {
    return (backendBooks || []).filter(book => {
      const matchesCategory = activeCategory === "All" || book.categories.includes(activeCategory);
      const matchesSearch =
        book.title.toLowerCase().includes(search.toLowerCase()) ||
        book.author.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [search, activeCategory, backendBooks]);

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await getBooks();
      if (response.data && response.data.books) {
        const mappedBooks: Book[] = response.data.books.map((book: any) => ({
          id: book._id,
          title: book.title,
          author: book.author,
          coverImage: import.meta.env.VITE_BACKEND_URL + book.coverImage,
          description: book.description,
          summary: book.summary,
          categories: book.categories,
          metaTitle: book.metaTitle,
          metaDescription: book.metaDescription,
          metaKeywords: book.metaKeywords,
          genre: book.genre,
          affiliateLink: book.affiliateLink,
          publicationDate: book.publicationDate,
          rating: book.rating,
          reviews: book.reviews,
          audioLink: import.meta.env.VITE_BACKEND_URL + book.audioUri,
        }));
        setBackendBooks(mappedBooks);
      }
    };
    fetchBooks();
  }, []);

  return (
    <div className="py-8 px-4 max-w-7xl mx-auto">
      <BookStoreHeader search={search} setSearch={setSearch} />
      <BookStoreCategories categories={categories} activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
      <BookStoreGrid books={filteredBooks} />
    </div>
  );
}

export default BookStore;
