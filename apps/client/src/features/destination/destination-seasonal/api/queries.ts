import { SeasonEnum } from '@/enums/season';
import { DestinationSeasonal } from '@/features/destination/destination-seasonal/types/destinationSeasonal';

export const getDestinationSeasonal = async (season: SeasonEnum): Promise<DestinationSeasonal[]> => {
  const response = await fetch(`/api/destinations/seasonal?season=${season}`);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error);
  }

  return response.json();
};
