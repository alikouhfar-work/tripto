import { FC } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export const DestinationSeasonalListSkeleton: FC = () => {
  const destinations = Array.from({ length: 4 });

  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {destinations.map((_, index) => (
        <li
          key={index}
          className="relative aspect-video overflow-hidden rounded-2xl shadow lg:aspect-auto lg:h-130"
        >
          <div className="absolute bottom-0 left-0 z-20 w-full px-4 py-6">
            <Skeleton className="h-3 w-16 rounded-sm" />
            <Skeleton className="mt-0.5 h-7.5 w-44" />
            <Skeleton className="mt-5 h-7 w-28" />
            <Skeleton className="mt-px h-4 w-full rounded-sm" />
          </div>
        </li>
      ))}
    </ul>
  );
};
