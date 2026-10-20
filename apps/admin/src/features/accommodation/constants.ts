export const ACCOMMODATION_ERRORS = {
  DUPLICATE: 'Accommodation with this full address and title already exists',
  DUPLICATE_TITLE: 'Accommodation with this name already exists',
  NOT_FOUND: 'Accommodation not found',
  ID_REQUIRED: 'Accommodation id is required',
  IN_USE: 'Cannot delete accommodation because it is being used by activities or accommodations',
  GET_FAILED: 'Failed to get accommodation. Please try again.',
  GET_LIST_FAILED: 'Failed to get accommodations. Please try again.',
  CREATE_FAILED: 'Failed to create accommodation. Please try again.',
  UPDATE_FAILED: 'Failed to update accommodation. Please try again.',
  DELETE_FAILED: 'Failed to delete accommodation. Please try again.',
  CREATE_IMAGE_FAILED: 'Accommodation created successfully, but hero image upload failed.',
  DELETE_IMAGE_FAILED: 'Accommodation deleted successfully, but hero image upload failed.',
  UPDATE_IMAGE_FAILED: 'Accommodation updated successfully, but hero image upload failed.',
  DELETE_GALLERY_FAILED: 'Accommodation deleted successfully, but gallery images upload failed.',
  CREATE_SOME_GALLERY_FAILED:
    'Accommodation created successfully, but some gallery images upload failed.',
  UPDATE_SOME_GALLERY_FAILED:
    'Accommodation updated successfully, but some gallery images upload failed.',
} as const;

export const ACCOMMODATION_SUCCESS = {
  CREATED: 'Accommodation created successfully',
  UPDATED: 'Accommodation updated successfully',
  DELETED: 'Accommodation deleted successfully',
} as const;
