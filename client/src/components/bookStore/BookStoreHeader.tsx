import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState, useEffect } from "react";

type BookStoreHeaderProps = {
  search: string;
  setSearch: (value: string) => void;
};

const TYPING_TEXT = "Search books or authors...";

const BookStoreHeader = ({ search, setSearch }: BookStoreHeaderProps) => {
  const [placeholder, setPlaceholder] = useState("");

  useEffect(() => {
    let current = 0;
    let forward = true;
    let timeout: NodeJS.Timeout;
    const type = () => {
      setPlaceholder(TYPING_TEXT.slice(0, current));
      if (forward) {
        if (current < TYPING_TEXT.length) {
          current++;
          timeout = setTimeout(type, 60);
        } else {
          forward = false;
          timeout = setTimeout(type, 1200);
        }
      } else {
        if (current > 0) {
          current--;
          timeout = setTimeout(type, 30);
        } else {
          forward = true;
          timeout = setTimeout(type, 500);
        }
      }
    };
    type();
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center gap-4 py-8 px-4 overflow-hidden">
      {/* Animated gradient blobs background */}
      <div className="absolute inset-0 -z-20 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[350px] h-[350px] bg-gradient-to-br from-purple-400 via-pink-300 to-indigo-400 opacity-40 rounded-full filter blur-3xl animate-blob1" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[300px] h-[300px] bg-gradient-to-tr from-pink-400 via-indigo-300 to-purple-400 opacity-30 rounded-full filter blur-2xl animate-blob2" />
      </div>
      {/* Subtle animated grid overlay */}
      <div className="absolute inset-0 -z-10 opacity-20 pointer-events-none animate-moveGrid">
        <svg width="100%" height="100%" viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#a78bfa" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      <h1 className="text-4xl md:text-5xl font-extrabold mb-2 text-center bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 bg-clip-text text-transparent animate-gradient-x drop-shadow-lg">
        Book Store
      </h1>
      <p className="text-lg md:text-xl text-center text-gray-500 dark:text-gray-300 mb-4 font-medium max-w-2xl">
        Discover, search, and explore your next favorite book from our curated collection.
      </p>
      <div className="w-full max-w-md relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10">
          <Search className="w-5 h-5" />
        </span>
        <Input
          type="text"
          placeholder={placeholder}
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="pl-12 pr-4 py-3 rounded-2xl bg-white/60 dark:bg-black/40 border border-gray-200 dark:border-gray-700 shadow-xl focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-all duration-200 backdrop-blur-md text-base font-medium placeholder-gray-400 dark:placeholder-gray-500"
        />
      </div>
      <style>{`
        @keyframes blob1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -20px) scale(1.1); }
          66% { transform: translate(-20px, 30px) scale(0.95); }
        }
        @keyframes blob2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-25px, 20px) scale(1.05); }
          66% { transform: translate(20px, -25px) scale(0.9); }
        }
        .animate-blob1 { animation: blob1 16s ease-in-out infinite; }
        .animate-blob2 { animation: blob2 18s ease-in-out infinite; }
        @keyframes moveGrid {
          0% { background-position: 0 0; }
          100% { background-position: 200px 100px; }
        }
        .animate-moveGrid { animation: moveGrid 30s linear infinite; }
      `}</style>
    </div>
  );
};

export default BookStoreHeader; 