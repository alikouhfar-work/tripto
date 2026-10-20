import { FC } from 'react';
import { AccommodationCardSkeleton } from '@/features/accommodation/components/AccommodationCardSkeleton';

export const DestinationPopularSliderSkeleton: FC = () => {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <AccommodationCardSkeleton />
      <AccommodationCardSkeleton className="hidden sm:flex" />
      <AccommodationCardSkeleton className="hidden lg:flex" />
      <AccommodationCardSkeleton className="hidden lg:flex" />
    </ul>
  );
};
