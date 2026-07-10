import { ACCOMMODATION_TAG_ERRORS } from '@/features/accommodation-tag/constants';

export const deleteAccommodationTag = async (id: string) => {
  const response = await fetch(`/api/accommodation-tags/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || ACCOMMODATION_TAG_ERRORS.DELETE_FAILED);
  }

  return response.json();
};
