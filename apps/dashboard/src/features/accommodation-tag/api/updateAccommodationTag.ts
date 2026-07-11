import { AccommodationTagFormData } from '@/features/accommodation-tag/types/accommodationTag';
import { ACCOMMODATION_TAG_ERRORS } from '@/features/accommodation-tag/constants';

export const updateAccommodationTag = async (id: string, data: AccommodationTagFormData) => {
  const response = await fetch(`/api/accommodation-tags/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || ACCOMMODATION_TAG_ERRORS.UPDATE_FAILED);
  }

  return response.json();
};
