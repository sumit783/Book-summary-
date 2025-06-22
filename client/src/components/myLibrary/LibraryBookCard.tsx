import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

type LibraryBookCardProps = {
  book: {
    id: number;
    title: string;
    author: string;
    coverImage: string;
    progress: number;
  };
};

const LibraryBookCard = ({ book }: LibraryBookCardProps) => {
  const navigate = useNavigate();

  return (
    <div className="relative rounded-2xl shadow-2xl p-6 flex flex-col items-center transition-transform duration-300 hover:scale-[1.04] hover:-translate-y-2 hover:shadow-3xl group backdrop-blur-xl border border-white/30 dark:border-neutral-800 overflow-visible before:content-[''] before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-r before:from-purple-400 before:via-pink-400 before:to-indigo-400 before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-40 before:pointer-events-none mt-10">
      {/* Floating cover image with shadow and overlap */}
      <div className="relative z-10 -mt-16 mb-2 w-28 h-28 rounded-xl overflow-hidden shadow-2xl border-4 border-white dark:border-neutral-900 bg-gradient-to-br from-purple-400/60 to-indigo-400/60 group-hover:ring-8 group-hover:ring-pink-400/30 transition-all duration-300 flex items-center justify-center">
        <img src={book.coverImage} alt={book.title} className="w-full h-full object-cover rounded-xl group-hover:scale-110 transition-all duration-300" />
        {/* Overlay progress bar on image */}
        <div className="absolute bottom-0 left-0 w-full h-3 bg-white/60 dark:bg-black/40 rounded-b-xl overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 rounded-full transition-all duration-500"
            style={{ width: `${book.progress}%` }}
          />
        </div>
        <div className="absolute bottom-1 right-2 text-xs text-gray-700 dark:text-gray-200 font-bold drop-shadow">{book.progress}%</div>
      </div>
      <div className="text-lg font-bold text-center text-gray-900 dark:text-white mb-1 line-clamp-2">{book.title}</div>
      <div className="text-sm text-gray-500 dark:text-gray-300 mb-2 text-center">by {book.author}</div>
      <button
        className="mt-4 px-5 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 text-white text-sm font-bold shadow-lg hover:shadow-2xl hover:from-pink-500 hover:to-indigo-700 transition-all duration-200 flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2 animate-glow"
        onClick={() => navigate(`/book/${book.id}`)}
      >
        Continue <ArrowRight className="w-4 h-4" />
      </button>
      <style>{`
        .animate-glow {
          box-shadow: 0 0 16px 0 #c084fc66, 0 0 32px 0 #f472b666;
          transition: box-shadow 0.3s;
        }
        .group:hover .animate-glow {
          box-shadow: 0 0 32px 4px #c084fc99, 0 0 48px 8px #f472b699;
        }
      `}</style>
    </div>
  );
};

export default LibraryBookCard; 