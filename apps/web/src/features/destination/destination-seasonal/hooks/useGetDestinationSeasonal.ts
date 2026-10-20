import { useQuery } from '@tanstack/react-query';
import { getDestinationSeasonal } from '@/features/destination/destination-seasonal/server/queries';
import { SeasonEnum } from '@/enums/season';
import { DESTINATION_QUERY_KEYS } from '@/features/destination/constants';

export const useGetDestinationSeasonal = (season: SeasonEnum) => {
  return useQuery({
    queryKey: DESTINATION_QUERY_KEYS.seasonal(season),
    queryFn: () => getDestinationSeasonal(season),
  });
};
