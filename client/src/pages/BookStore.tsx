import BookStoreHeader from "@/components/bookStore/BookStoreHeader";
import BookStoreCategories from "@/components/bookStore/BookStoreCategories";
import BookStoreGrid from "@/components/bookStore/BookStoreGrid";
import { useState, useMemo } from "react";
import { bookData } from "@/data/bookData";

function BookStore() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  // Get unique categories from all books
  const allCategories = useMemo(() => Array.from(new Set(bookData.flatMap(book => book.categories))), []);
  const categories = ["All", ...allCategories];

  // Filter books based on search and selected category
  const filteredBooks = useMemo(() => {
    return bookData.filter(book => {
      const matchesCategory = activeCategory === "All" || book.categories.includes(activeCategory);
      const matchesSearch =
        book.title.toLowerCase().includes(search.toLowerCase()) ||
        book.author.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [search, activeCategory]);

  return (
    <div className="py-8 px-4 max-w-7xl mx-auto">
      <BookStoreHeader search={search} setSearch={setSearch} />
      <BookStoreCategories categories={categories} activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
      <BookStoreGrid books={filteredBooks} />
    </div>
  );
}

export default BookStore;
