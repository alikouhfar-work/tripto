

export const deleteActivityType = async (id: string) => {
  const response = await fetch(`/api/activity-types/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || ACTIVITY_TYPE_ERRORS.DELETE_FAILED);
  }

  return response.json();
};
