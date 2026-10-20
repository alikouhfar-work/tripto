export const ACTIVITY_TYPE_ERRORS = {
  DUPLICATE_NAME_TITLE: 'Activity type with this name and title already exists',
  DUPLICATE_TITLE: 'Activity type with this name already exists',
  NOT_FOUND: 'Activity type not found',
  ID_REQUIRED: 'Activity type id is required',
  IN_USE: 'Cannot delete activity type because it is being used by activities or accommodations',
  GET_FAILED: 'Failed to get activity type. Please try again.',
  GET_LIST_FAILED: 'Failed to get activity types. Please try again.',
  CREATE_FAILED: 'Failed to create activity type. Please try again.',
  UPDATE_FAILED: 'Failed to update activity type. Please try again.',
  DELETE_FAILED: 'Failed to delete activity type. Please try again.',
} as const;

export const ACTIVITY_TYPE_SUCCESS = {
  CREATED: 'Activity type created successfully',
  UPDATED: 'Activity type updated successfully',
  DELETED: 'Activity type deleted successfully',
} as const;
