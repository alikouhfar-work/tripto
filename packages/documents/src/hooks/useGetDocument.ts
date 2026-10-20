'use client'

import { useQuery } from '@tanstack/react-query';
import { UseGetDocumentParams } from '../types';
import { DOCUMENT_QUERY_KEYS } from '../constants';
import { getDocument } from '../api/getDocument';

export const useGetDocument = ({ id, bucket, object, category }: UseGetDocumentParams) => {
  return useQuery({
    queryKey: [...DOCUMENT_QUERY_KEYS.document({ id, bucket, category, object })],
    queryFn: () => getDocument({ bucket, object }),
    // Don't fire storage calls for empty objects (first render placeholders).
    enabled: !!bucket && !!object,
  });
};
