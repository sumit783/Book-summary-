import { BookOpen, Github, Twitter, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="w-full bg-gradient-to-r from-white via-purple-100 to-indigo-100 dark:from-purple-950 dark:via-indigo-950 dark:to-neutral-900 pt-8 pb-40 md:pb-36 px-4 mt-16 ">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-3 mb-4 md:mb-0">
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 p-2 rounded-full shadow-lg">
            <BookOpen className="w-7 h-7 text-purple-600 dark:text-purple-300" />
          </span>
          <span className="text-xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 bg-clip-text text-transparent dark:from-purple-300 dark:via-pink-300 dark:to-indigo-300">
            EchoBooks
          </span>
        </div>
        {/* Footer Menu */}
        <nav className="flex flex-wrap gap-6 items-center justify-center text-base font-medium">
          <Link to="/" className="text-gray-700 hover:text-purple-700 dark:text-gray-300 dark:hover:text-white transition-colors">Home</Link>
          <Link to="/books" className="text-gray-700 hover:text-purple-700 dark:text-gray-300 dark:hover:text-white transition-colors">Books</Link>
          <Link to="/my-library" className="text-gray-700 hover:text-purple-700 dark:text-gray-300 dark:hover:text-white transition-colors">My Library</Link>
          <Link to="/about" className="text-gray-700 hover:text-purple-700 dark:text-gray-300 dark:hover:text-white transition-colors">About</Link>
          <Link to="/contact" className="text-gray-700 hover:text-purple-700 dark:text-gray-300 dark:hover:text-white transition-colors">Contact</Link>
        </nav>
        <div className="flex gap-4 text-gray-500 dark:text-gray-400 mb-4 md:mb-0">
          <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="hover:text-purple-600 dark:hover:text-purple-300 transition-colors">
            <Github className="w-5 h-5" />
          </a>
          <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="hover:text-purple-600 dark:hover:text-purple-300 transition-colors">
            <Twitter className="w-5 h-5" />
          </a>
          <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" className="hover:text-purple-600 dark:hover:text-purple-300 transition-colors">
            <Linkedin className="w-5 h-5" />
          </a>
        </div>
        <div className="text-gray-500 dark:text-gray-400 text-sm text-center md:text-right">
          &copy; {new Date().getFullYear()} EchoBooks. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;