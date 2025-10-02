const MyLibraryHeader = () => (
  <div className="relative flex flex-col items-center justify-center gap-2 py-8 mb-4 overflow-hidden">
    {/* Animated gradient blob background */}
    <div className="absolute inset-0 -z-10 pointer-events-none">
      <div className="absolute top-[-10%] left-[-10%] w-[300px] h-[300px] bg-gradient-to-br from-purple-400 via-pink-300 to-indigo-400 opacity-30 rounded-full filter blur-2xl animate-blob1" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[200px] h-[200px] bg-gradient-to-tr from-pink-400 via-indigo-300 to-purple-400 opacity-20 rounded-full filter blur-2xl animate-blob2" />
    </div>
    <h1 className="text-4xl md:text-4xl font-extrabold text-center bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 bg-clip-text text-transparent animate-gradient-x drop-shadow-lg mb-4">
      My Library
    </h1>
    <p className="text-lg text-center text-gray-500 dark:text-gray-300 max-w-xl">
      All your saved and favorite books in one place. Continue reading or start something new!
    </p>
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
    `}</style>
  </div>
);

export default MyLibraryHeader; 