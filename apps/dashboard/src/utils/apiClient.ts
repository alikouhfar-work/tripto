import { ServerTableParams, ServerTableResponse } from '@/components/shared/DataTable/types';

type FetchOptions = {
  endpoint: string;
  defaultError: string;
  fetchFn?: (path: string) => Promise<Response>;
};

export const createDropdownFetcher = <T>({ endpoint, defaultError, fetchFn }: FetchOptions) => {
  return async (onlyActive: boolean = true): Promise<T[]> => {
    const searchParams = new URLSearchParams();
    searchParams.set('onlyActive', String(onlyActive));

    const path = `${endpoint}?${searchParams.toString()}`;

    const response = fetchFn ? await fetchFn(path) : await fetch(path);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || defaultError);
    }

    return response.json();
  };
};

export const createListFetcher = <T>({ endpoint, defaultError, fetchFn }: FetchOptions) => {
  return async (params: ServerTableParams): Promise<ServerTableResponse<T>> => {
    const searchParams = new URLSearchParams();
    searchParams.set('page', params.page.toString());
    searchParams.set('pageSize', params.pageSize.toString());

    if (params.filter) searchParams.set('filter', params.filter);
    if (params.sort?.[0]) {
      searchParams.set('sortBy', params.sort[0].id);
      searchParams.set('sortOrder', params.sort[0].desc ? 'desc' : 'asc');
    }

    const path = `${endpoint}?${searchParams.toString()}`;

    const response = fetchFn ? await fetchFn(path) : await fetch(path);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || defaultError);
    }

    return response.json();
  };
};

export const createSingleFetcher = <T>({ endpoint, defaultError, fetchFn }: FetchOptions) => {
  return async (id: string): Promise<T> => {
    const path = `${endpoint}/${id}`;

    const response = fetchFn ? await fetchFn(path) : await fetch(path);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || defaultError);
    }

    return response.json();
  };
};
