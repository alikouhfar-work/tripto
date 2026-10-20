import { AccommodationListCard } from '@/features/accommodation/components/AccommodationListCard';
import React, { FC } from 'react';
import { AccommodationsListViewProps } from '@/features/accommodation/types/accommodationsListView';

export const AccommodationsListView: FC<AccommodationsListViewProps> = ({ accommodations }) => {
  return (
    <ul className="flex flex-col gap-4">
      {accommodations.map((accommodation) => (
        <AccommodationListCard
          key={accommodation.id}
          accommodation={accommodation}
          onSelectProperty={() => undefined}
          onToggleSaveProperty={() => undefined}
        />
      ))}
    </ul>
  );
};
