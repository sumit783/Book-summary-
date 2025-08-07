const DashboardSkeleton = () => (
  <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 dark:from-neutral-900 dark:via-indigo-950 dark:to-purple-950">
    <div className="w-full max-w-4xl p-8 rounded-3xl shadow-2xl border border-primary/10 backdrop-blur-xl bg-white/60 dark:bg-black/40">
      <div className="animate-pulse space-y-6">
        <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4" />
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-8" />
        <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded mb-6" />
        <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded" />
      </div>
    </div>
  </div>
);

export default DashboardSkeleton;