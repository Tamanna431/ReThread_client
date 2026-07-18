export default function SkeletonCard() {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col h-full border border-gray-100 animate-pulse">
      {/* Image Skeleton */}
      <div className="h-64 bg-gray-200" />

      {/* Content Skeleton */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-center gap-2 mb-2">
          <div className="h-3 w-16 bg-gray-200 rounded" />
          <div className="h-3 w-2 bg-gray-200 rounded" />
          <div className="h-3 w-20 bg-gray-200 rounded" />
        </div>

        <div className="h-5 w-3/4 bg-gray-200 rounded mb-2" />
        <div className="h-4 w-full bg-gray-200 rounded mb-1" />
        <div className="h-4 w-2/3 bg-gray-200 rounded mb-4" />

        <div className="flex items-center justify-between mb-4">
          <div className="h-4 w-12 bg-gray-200 rounded" />
          <div className="h-4 w-16 bg-gray-200 rounded" />
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="h-7 w-16 bg-gray-200 rounded" />
          <div className="h-9 w-24 bg-gray-200 rounded-lg" />
        </div>
      </div>
    </div>
  );
}