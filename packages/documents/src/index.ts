/**
 * Boundary-safe root barrel: types + cache keys only.
 * Import server actions from '@repo/documents/server' and
 * client hooks from '@repo/documents/client' — never mix them
 * through this entrypoint.
 */
export { DOCUMENT_QUERY_KEYS } from './constants';
export type * from './types';
