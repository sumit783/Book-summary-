const EmptyLibrary = () => (
  <div className="flex flex-col items-center justify-center py-20">
    <div className="text-7xl mb-6 animate-bounce">📚</div>
    <div className="text-2xl font-bold text-gray-700 dark:text-gray-200 mb-2">Your library is empty</div>
    <div className="text-gray-500 dark:text-gray-400 mb-6 text-center max-w-md">
      You haven't saved any books yet. Start exploring and add your favorites to build your personal library!
    </div>
    <a href="/books" className="px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold shadow-lg hover:shadow-xl hover:from-pink-500 hover:to-indigo-700 transition-all duration-200">
      Browse Books
    </a>
  </div>
);

export default EmptyLibrary; 