import { FC } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { DestinationRatingBadgeSkeleton } from '@/components/shared/DestinationRatingBadge/DestinationRatingBadgeSkeleton';
import { DestinationWeekendItemSkeletonProps } from '@/features/destination/destination-weekend/types/destinationWeekendItemSkeleton';
import { clsx } from 'clsx';

export const DestinationWeekendItemSkeleton: FC<DestinationWeekendItemSkeletonProps> = ({
  className,
}) => {
  return (
    <li className={clsx('flex min-h-112.5 flex-col overflow-hidden rounded-2xl shadow', className)}>
      <Skeleton className="relative h-52" />
      <div className="flex flex-1 flex-col justify-between gap-2 bg-white p-6">
        <div>
          <DestinationRatingBadgeSkeleton showReviewExpression side="right" />
          <Skeleton className="mt-1 h-8 w-full rounded-sm" />
          <Skeleton className="mt-4 h-5 w-40 rounded-sm" />
          <Skeleton className="mt-2 h-7.5 w-32 rounded-full" />
        </div>
        <Skeleton className="ml-auto h-7 w-40 rounded-sm" />
      </div>
    </li>
  );
};
