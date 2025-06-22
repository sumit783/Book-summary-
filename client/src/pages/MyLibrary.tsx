import MyLibraryHeader from "@/components/myLibrary/MyLibraryHeader";
import LibraryBookCard from "@/components/myLibrary/LibraryBookCard";
import EmptyLibrary from "@/components/myLibrary/EmptyLibrary";
import { useState } from "react";

// Mock data for demonstration
const mockBooks = [
  {
    id: 1,
    title: "Atomic Habits",
    author: "James Clear",
    coverImage: "/public/book1.jpg",
    progress: 60,
  },
  {
    id: 2,
    title: "Deep Work",
    author: "Cal Newport",
    coverImage: "/public/book2.jpg",
    progress: 20,
  },
  {
    id: 3,
    title: "The Alchemist",
    author: "Paulo Coelho",
    coverImage: "/public/book3.jpg",
    progress: 100,
  },
];

function MyLibrary() {
  const [books] = useState(mockBooks); // Replace with real data later
  return (
    <div className="min-h-screen py-8 px-4 md:max-w-7xl mx-auto ">
      <MyLibraryHeader />
      {books.length === 0 ? (
        <EmptyLibrary />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-8">
          {books.map((book) => (
            <LibraryBookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
}

export default MyLibrary;