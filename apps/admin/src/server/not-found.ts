import { notFound } from 'next/navigation';

/**
 * Map a query's NOT_FOUND error to the nearest `not-found.tsx` boundary.
 * Any other error is rethrown to the route `error.tsx` boundary.
 */
export const orNotFound = async <T,>(
  task: () => Promise<T>,
  notFoundMessage: string,
): Promise<T> => {
  try {
    return await task();
  } catch (error) {
    if (error instanceof Error && error.message === notFoundMessage) notFound();
    throw error;
  }
};
