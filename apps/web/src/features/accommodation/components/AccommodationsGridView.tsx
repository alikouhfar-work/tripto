import { AccommodationGridCard } from '@/features/accommodation/components/AccommodationGridCard';
import React, { FC } from 'react';
import { AccommodationsGridViewProps } from '@/features/accommodation/types/accommodationsGridView';

export const AccommodationsGridView: FC<AccommodationsGridViewProps> = ({ accommodations }) => {
  return (
    <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {accommodations.map((accommodation) => (
        <AccommodationGridCard
          key={accommodation.id}
          accommodation={accommodation}
          onSelectProperty={() => undefined}
          onToggleSaveProperty={() => undefined}
        />
      ))}
    </ul>
  );
};
