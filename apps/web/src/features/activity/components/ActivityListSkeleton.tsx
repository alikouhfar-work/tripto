import { FC } from 'react';
import { ActivityItemSkeleton } from '@/features/activity/components/ActivityItemSkeleton';

export const ActivityListSkeleton: FC = () => {
  const destinations = Array.from({ length: 6 });

  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
      {destinations.map((_, index) => (
        <ActivityItemSkeleton key={index} />
      ))}
    </ul>
  );
};
