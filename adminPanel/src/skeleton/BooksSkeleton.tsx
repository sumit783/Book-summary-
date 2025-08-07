const BooksSkeleton = () => (
  <div className="min-h-screen w-full bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 dark:from-neutral-900 dark:via-indigo-950 dark:to-purple-950 py-8 px-2 flex flex-col items-center">
    <div className="w-full md:max-w-6xl mx-auto glass-card rounded-3xl shadow-2xl border border-primary/10 backdrop-blur-xl p-2 md:p-8">
      <div className="flex justify-between items-center mb-8 animate-pulse">
        <div className="h-10 w-1/3 bg-gray-200 dark:bg-gray-700 rounded" />
        <div className="h-10 w-32 bg-gray-200 dark:bg-gray-700 rounded" />
      </div>
      <div className="flex md:flex-row items-center gap-4 mb-8 bg-white/70 dark:bg-neutral-900/80 rounded-2xl shadow-lg p-4 border border-primary/10 animate-pulse">
        <div className="h-12 w-full bg-gray-200 dark:bg-gray-700 rounded" />
      </div>
      <div className="rounded-2xl shadow-xl p-6 bg-white/80 dark:bg-neutral-900/80 border border-primary/10 animate-pulse">
        <div className="space-y-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="flex items-center gap-4">
              <div className="h-8 w-1/4 bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="h-8 w-1/4 bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="h-8 w-1/4 bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="h-8 w-1/4 bg-gray-200 dark:bg-gray-700 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default BooksSkeleton;