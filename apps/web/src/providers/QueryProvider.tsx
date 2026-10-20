// Canonical: `QueryProvider` lives in `@repo/api-client/client`. Back-compat re-export.
// Identical behavior (shared queryClient defaults); admin keeps its own copy
// only because it mounts ReactQueryDevtools in dev.
export { QueryProvider } from '@repo/api-client/client';
