import { GetDestinationWeekendResponse } from '@/features/destination/destination-weekend/types/destinationWeekendAPI';

export const getDestinationWeekend = async (): GetDestinationWeekendResponse => {
  const response = await fetch('/api/destinations/weekend');

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error);
  }

  return response.json();
};
