//ローディング UI

export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="h-6 w-1/4 bg-gray-200 animate-pulse rounded"></div>
      <div className="space-y-4">
        <div className="h-4 w-full bg-gray-200 animate-pulse rounded"></div>
        <div className="h-4 w-3/4 bg-gray-200 animate-pulse rounded"></div>
        <div className="h-4 w-1/2 bg-gray-200 animate-pulse rounded"></div>
      </div>
    </div>
  );
}
