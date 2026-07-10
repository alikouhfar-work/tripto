import { AccommodationTagFormData } from '@/features/accommodation-tag/types';
import { ACCOMMODATION_TAG_ERRORS } from '@/features/accommodation-tag/constants';

export const createAccommodationTag = async (data: AccommodationTagFormData) => {
  const response = await fetch('/api/accommodation-tags', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || ACCOMMODATION_TAG_ERRORS.CREATE_FAILED);
  }

  return response.json();
};
