import { FC } from 'react';
import { AccommodationCardSkeleton } from '@/features/accommodation/components/AccommodationCardSkeleton';

export const DestinationWeekendSliderSkeleton: FC = () => {
  return (
    <ul className="grid gap-4 p-1 sm:grid-cols-2 lg:grid-cols-4">
      <AccommodationCardSkeleton />
      <AccommodationCardSkeleton className="hidden sm:flex" />
      <AccommodationCardSkeleton className="hidden lg:flex" />
      <AccommodationCardSkeleton className="hidden lg:flex" />
    </ul>
  );
};
