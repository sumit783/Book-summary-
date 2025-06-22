const TopPlayedTableSkeleton = () => (
  <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-4 animate-pulse">
    <div className="h-6 w-1/3 bg-gray-200 dark:bg-gray-800 rounded mb-4" />
    <div className="h-4 w-1/4 bg-gray-200 dark:bg-gray-800 rounded mb-6" />
    <div className="overflow-hidden rounded-lg border border-border/50">
      <div className="w-full">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center py-4 border-b border-border/30 last:border-b-0 gap-4">
            <div className="w-12 h-12 bg-gray-200 dark:bg-gray-800 rounded-lg mr-4" />
            <div className="flex-1">
              <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-800 rounded mb-2" />
              <div className="h-3 w-1/3 bg-gray-200 dark:bg-gray-800 rounded" />
            </div>
            <div className="h-4 w-12 bg-gray-200 dark:bg-gray-800 rounded mx-2" />
            <div className="h-4 w-16 bg-gray-200 dark:bg-gray-800 rounded mx-2" />
            <div className="h-4 w-10 bg-gray-200 dark:bg-gray-800 rounded mx-2" />
            <div className="h-4 w-10 bg-gray-200 dark:bg-gray-800 rounded mx-2" />
            <div className="h-4 w-16 bg-gray-200 dark:bg-gray-800 rounded mx-2" />
          </div>
        ))}
      </div>
    </div>
    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="h-12 bg-gray-200 dark:bg-gray-800 rounded-lg" />
      ))}
    </div>
  </div>
);

export default TopPlayedTableSkeleton; 