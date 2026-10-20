export type FetchFn = (path: string) => Promise<Response>;

export type FetchOptions = {
  endpoint: string;
  defaultError?: string;
  fetchFn?: FetchFn;
};

export type ServerTableSort = { id: string; desc?: boolean };

export type ServerTableParams = {
  page: number;
  pageSize: number;
  filter?: string;
  sort?: ServerTableSort[];
};

export type ServerTableResponse<T> = {
  data: T[];
  totalCount: number;
};

function toError(response: Response, fallback?: string): Promise<never> {
  return response.json().then((error: { error?: string }) => {
    throw new Error(error?.error || fallback || 'Request failed');
  });
}

export const createDropdownFetcher = <T>({ endpoint, defaultError, fetchFn }: FetchOptions) => {
  return async (onlyActive = true): Promise<T[]> => {
    const searchParams = new URLSearchParams();
    searchParams.set('onlyActive', String(onlyActive));

    const path = `${endpoint}?${searchParams.toString()}`;
    const response = fetchFn ? await fetchFn(path) : await fetch(path);

    if (!response.ok) await toError(response, defaultError);

    return response.json() as Promise<T[]>;
  };
};

export const createListFetcher =
  <TParams, TResponse>({ endpoint, defaultError, fetchFn }: FetchOptions) =>
  async (params: TParams): Promise<TResponse> => {
    const queryString = new URLSearchParams(params as Record<string, string>).toString();
    const url = queryString ? `${endpoint}?${queryString}` : endpoint;

    const response = fetchFn ? await fetchFn(url) : await fetch(url);

    if (!response.ok) await toError(response, defaultError);

    return response.json() as Promise<TResponse>;
  };

export const createTableListFetcher =
  <T>({ endpoint, defaultError, fetchFn }: FetchOptions) =>
  async (params: ServerTableParams): Promise<ServerTableResponse<T>> => {
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

    if (!response.ok) await toError(response, defaultError);

    return response.json() as Promise<ServerTableResponse<T>>;
  };

export const createSingleFetcher =
  <T>({ endpoint, defaultError, fetchFn }: FetchOptions) =>
  async (id: string): Promise<T> => {
    const path = `${endpoint}/${id}`;
    const response = fetchFn ? await fetchFn(path) : await fetch(path);

    if (!response.ok) await toError(response, defaultError);

    return response.json() as Promise<T>;
  };
