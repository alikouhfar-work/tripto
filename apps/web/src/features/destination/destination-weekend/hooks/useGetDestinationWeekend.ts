import { useQuery } from '@tanstack/react-query';
import { DESTINATION_QUERY_KEYS } from '@/features/destination/constants';
import { getDestinationWeekend } from '@/features/destination/destination-weekend/server/queries';

export const useGetDestinationWeekend = () => {
  return useQuery({
    queryKey: DESTINATION_QUERY_KEYS.weekend(),
    queryFn: () => getDestinationWeekend(),
  });
};
