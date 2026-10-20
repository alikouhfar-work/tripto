import { useQuery } from '@tanstack/react-query';
import { DESTINATION_QUERY_KEYS } from '@/features/destination/constants';
import { getDestinationPopular } from '@/features/destination/destination-popular/server/queries';

export const useGetDestinationPopular = () => {
  return useQuery({
    queryKey: DESTINATION_QUERY_KEYS.popular(),
    queryFn: getDestinationPopular,
  });
};
