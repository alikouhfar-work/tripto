import { FC } from 'react';
import { DestinationSeasonalListProps } from '@/features/destination/destination-seasonal/types/destinationSeasonalList';
import { DestinationSeasonalListSkeleton } from '@/features/destination/destination-seasonal/components/DestinationSeasonalListSkeleton';
import { useGetDestinationSeasonal } from '@/features/destination/destination-seasonal/hooks/useGetDestinationSeasonal';
import { DestinationSeasonalItem } from '@/features/destination/destination-seasonal/components/DestinationSeasonalItem';

export const DestinationSeasonalList: FC<DestinationSeasonalListProps> = ({ selectedSeason }) => {
  const { isFetching, data: destinations } = useGetDestinationSeasonal(selectedSeason);

  if (isFetching) return <DestinationSeasonalListSkeleton />;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {destinations?.map((destination, index) => (
        <DestinationSeasonalItem
          index={index}
          destination={destination}
          key={destination.accommodationId}
        />
      ))}
    </div>
  );
};
