import { useState } from "react";
import { Button } from "../ui/button"
import { books } from "@/data/books"
import BookCard from "./BookCard";

function BookSection() {
    const [activeCategory, setActiveCategory] = useState("All");
    
    // Get unique categories from all books
    const allCategories = Array.from(new Set(books.flatMap(book => book.categories)));
    const categories = ["All", ...allCategories];

    // Filter books based on selected category
    const filteredBooks = activeCategory === "All" 
        ? books 
        : books.filter(book => book.categories.includes(activeCategory));

    return (
        <div className="py-5 px-4">
            <div>
                <h2 className="text-3xl md:text-5xl mb-5 text-white">
                    Categories
                </h2>
                <div className="flex overflow-x-auto space-x-2 border-white/20 border-1 py-2 px-4 rounded-lg">
                    {categories.map((category) => (
                        <Button 
                            key={category}
                            variant="outline" 
                            onClick={() => setActiveCategory(category)}
                            className={`hover:text-white bg-black border-white/20 text-white px-6 py-3 rounded-lg shadow-lg transition duration-300 ${
                                activeCategory === category ? 'bg-purple-500 hover:bg-purple-600 border-white/30' : 'hover:border-white/30 hover:bg-slate-900'
                            }`}
                        >
                            {category}
                        </Button>
                    ))}
                </div>
            </div>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredBooks.map((book) => (
                    <BookCard key={book.id} book={book} />
                ))}
            </div>
        </div>
    )
}

export default BookSection