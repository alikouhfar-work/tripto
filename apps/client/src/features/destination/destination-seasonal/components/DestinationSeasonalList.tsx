import { FC } from 'react';
import { DestinationSeasonalItem } from '@/features/destination/destination-seasonal/components/DestinationSeasonalItem';
import { DestinationSeasonalListProps } from '@/features/destination/destination-seasonal/types/destinationSeasonalList';
import { DestinationSeasonalListSkeleton } from '@/features/destination/destination-seasonal/components/DestinationSeasonalListSkeleton';
import { useGetDestinationSeasonal } from '@/features/destination/destination-seasonal/hooks/useGetDestinationSeasonal';

export const DestinationSeasonalList: FC<DestinationSeasonalListProps> = ({ season }) => {
  const { isFetching, data: destinations } = useGetDestinationSeasonal(season);

  if (isFetching) return <DestinationSeasonalListSkeleton />;

  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {destinations?.map((destination) => (
        <DestinationSeasonalItem key={destination.accommodationId} destination={destination} />
      ))}
    </ul>
  );
};
