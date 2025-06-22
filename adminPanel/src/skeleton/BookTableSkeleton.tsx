export default function BookTableSkeleton() {
    return (
      <div className="w-full animate-pulse">
        <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded mb-4 w-1/3" />
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center py-4 border-b border-gray-200 last:border-b-0 gap-4 px-4">
              <div className="w-12 h-16 bg-gray-200 dark:bg-gray-800 rounded mr-4" />
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
    );
  }