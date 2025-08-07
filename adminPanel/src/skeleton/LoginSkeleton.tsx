const LoginSkeleton = () => (
  <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">
    <div className="relative z-10 w-full max-w-md">
      <div className="text-center mb-8 animate-pulse">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-700 rounded-2xl mb-6" />
        <div className="h-8 w-1/2 mx-auto bg-gray-700 rounded mb-2" />
        <div className="h-4 w-1/3 mx-auto bg-gray-700 rounded" />
      </div>
      <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-8 animate-pulse">
        <div className="space-y-6">
          <div className="h-12 bg-gray-700 rounded w-full mb-4" />
          <div className="h-12 bg-gray-700 rounded w-full mb-4" />
          <div className="h-6 bg-gray-700 rounded w-1/2 mb-4" />
          <div className="h-12 bg-gray-700 rounded w-full" />
        </div>
      </div>
      <div className="text-center my-8 animate-pulse">
        <div className="h-4 w-1/2 mx-auto bg-gray-700 rounded" />
      </div>
    </div>
  </div>
);

export default LoginSkeleton;