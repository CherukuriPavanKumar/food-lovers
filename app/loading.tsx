export default function Loading() {
  return (
    <div className="min-h-screen">
      {/* Hero Skeleton */}
      <div className="h-screen bg-gray-300 animate-pulse relative">
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/40 flex items-center justify-center">
          <div className="text-center max-w-4xl px-4">
            <div className="h-8 bg-gray-400 rounded-full w-48 mx-auto mb-6 animate-pulse"></div>
            <div className="h-16 bg-gray-400 rounded-lg w-full mb-4 animate-pulse"></div>
            <div className="h-16 bg-gray-400 rounded-lg w-4/5 mx-auto mb-8 animate-pulse"></div>
            <div className="flex gap-4 justify-center">
              <div className="h-14 bg-gray-400 rounded-lg w-40 animate-pulse"></div>
              <div className="h-14 bg-gray-400 rounded-lg w-40 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="h-56 bg-gray-200 animate-pulse"></div>
              <div className="p-6">
                <div className="h-8 bg-gray-200 rounded-lg mb-3 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded-lg mb-3 w-3/4 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded-lg mb-4 w-5/6 animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
