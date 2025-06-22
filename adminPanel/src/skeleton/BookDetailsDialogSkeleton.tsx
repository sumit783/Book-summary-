export default function BookDetailsDialogSkeleton() {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative animate-pulse">
          <div className="flex flex-col items-center gap-4">
            <div className="w-32 h-48 bg-gray-200 dark:bg-gray-800 rounded-md shadow mb-4" />
            <div className="h-6 w-1/2 bg-gray-200 dark:bg-gray-800 rounded mb-2" />
            <div className="h-4 w-1/3 bg-gray-200 dark:bg-gray-800 rounded mb-2" />
            <div className="h-4 w-1/3 bg-gray-200 dark:bg-gray-800 rounded mb-2" />
            <div className="h-4 w-2/3 bg-gray-200 dark:bg-gray-800 rounded mb-2" />
            <div className="h-4 w-1/4 bg-gray-200 dark:bg-gray-800 rounded" />
          </div>
        </div>
      </div>
    );
  }
  