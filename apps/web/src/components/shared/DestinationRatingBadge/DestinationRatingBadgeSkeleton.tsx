import { clsx } from 'clsx';
import { FC } from 'react';
import { destinationRatingBadgeConfig } from './lib/destinationRatingBadgeConfig';
import { DestinationRatingBadgeSkeletonProps } from '@/components/shared/DestinationRatingBadge/types/destinationRatingBadgeSkeleton';
import { Skeleton } from '@/components/ui/skeleton';

export const DestinationRatingBadgeSkeleton: FC<DestinationRatingBadgeSkeletonProps> = ({
  side = 'left',
  size = 'small',
  direction = 'horizontal',
  showReview = true,
  showReviewCount = true,
  showReviewExpression = true,
}) => {
  return (
    <div className="flex gap-1.5">
      <Skeleton
        className={clsx(
          destinationRatingBadgeConfig[direction][size][side],
          destinationRatingBadgeConfig[direction][size].container,
        )}
      />

      {showReview && (
        <div
          className={clsx('flex', direction === 'horizontal' ? 'items-center gap-1' : 'flex-col')}
        >
          {showReviewExpression && (
            <Skeleton
              className={clsx(size === 'large' ? 'h-5 w-20 rounded-sm' : 'h-4 w-16 rounded-sm')}
            />
          )}

          {showReviewCount && (
            <Skeleton
              className={clsx(size === 'large' ? 'h-5 w-20 rounded-sm' : 'h-4 w-16 rounded-sm')}
            />
          )}
        </div>
      )}
    </div>
  );
};
