import { FC } from 'react';
import { DestinationWeekendItemSkeleton } from '@/features/destination/destination-weekend/components/DestinationWeekendItemSkeleton';

export const DestinationWeekendSliderSkeleton: FC = () => {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <DestinationWeekendItemSkeleton />
      <DestinationWeekendItemSkeleton className="hidden sm:flex" />
      <DestinationWeekendItemSkeleton className="hidden lg:flex" />
      <DestinationWeekendItemSkeleton className="hidden lg:flex" />
    </ul>
  );
};
