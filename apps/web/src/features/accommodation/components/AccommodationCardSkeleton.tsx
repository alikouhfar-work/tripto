import React, { FC } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { clsx } from 'clsx';

type AccommodationCardSkeletonProps = {
  className?: string;
};

export const AccommodationCardSkeleton: FC<AccommodationCardSkeletonProps> = ({ className }) => {
  return (
    <li
      className={clsx(
        'group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs transition-all duration-300',
        className,
      )}
    >
      <Skeleton className="relative aspect-4/3" />
      <div className="flex flex-col justify-between p-5">
        <div className="space-y-2">
          <Skeleton className="h-5 w-2/3 rounded" />
          <Skeleton className="h-10 w-full rounded" />
          <Skeleton className="h-4 w-1/3 rounded" />
        </div>

        <div className="mt-5 flex items-center border-t border-slate-200/80 pt-4">
          <div>
            <Skeleton className="mb-px h-3.75 w-20 rounded" />
            <Skeleton className="h-7 w-12 rounded" />
          </div>
        </div>
      </div>
    </li>
  );
};
