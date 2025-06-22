import { BookOpen } from "lucide-react";

const AboutHeader = () => (
  <div className="flex flex-col items-center gap-4 mb-8 mt-8 relative z-10">
    <div className="bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 p-4 rounded-full shadow-lg mb-2 animate-pulse">
      <BookOpen className="w-12 h-12 text-white drop-shadow" />
    </div>
    <h1 className="text-5xl md:text-6xl font-extrabold text-center bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent animate-gradient-x drop-shadow-lg">
      About EchoBooks
    </h1>
    <p className="text-xl md:text-2xl text-center text-gray-200 max-w-2xl font-medium">
      Your gateway to the world's most influential books, summarized for you.
    </p>
  </div>
);

export default AboutHeader; 