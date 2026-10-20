import { Skeleton } from '@/components/ui/skeleton';

/** Loading placeholder for the hotel rooms management view. */
export const AccommodationRoomsSkeleton = () => (
  <div className="w-full" aria-busy="true" aria-label="Loading rooms">
    <div className="mb-5 flex items-center gap-2">
      <Skeleton className="h-4 w-28" />
      <Skeleton className="h-4 w-4 rounded-full" />
      <Skeleton className="h-4 w-20" />
      <Skeleton className="h-4 w-4 rounded-full" />
      <Skeleton className="h-4 w-16" />
    </div>

    <Skeleton className="mb-6 h-16 w-full rounded-2xl" />

    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="flex flex-col overflow-hidden rounded-xl border border-border bg-card"
        >
          <Skeleton className="h-48 w-full rounded-none" />
          <div className="flex flex-col gap-2 p-4">
            <Skeleton className="h-6 w-3/4" />
            <div className="mt-2 flex flex-wrap gap-2">
              <Skeleton className="h-7 w-20 rounded-lg" />
              <Skeleton className="h-7 w-24 rounded-lg" />
              <Skeleton className="h-7 w-28 rounded-lg" />
            </div>
            <div className="mt-4 flex justify-end border-t border-border/60 pt-3">
              <Skeleton className="h-5 w-24" />
            </div>
          </div>
        </div>
      ))}
    </div>

    <Skeleton className="mt-6 h-8 w-28 rounded-lg" />
  </div>
);
