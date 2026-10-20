'use client'

import { useQuery } from "@tanstack/react-query";
import { UseGetDocumentsParams } from '../types';
import { DOCUMENT_QUERY_KEYS } from '../constants';
import { getDocuments } from '../api/getDocuments';

export const useGetDocuments = ({
  id,
  prefix,
  bucket,
  category,
}: UseGetDocumentsParams) => {
  return useQuery({
    queryKey: [...DOCUMENT_QUERY_KEYS.documents({ id, bucket, category, prefix })],
    queryFn: () => getDocuments({ bucket, prefix }),
    // Don't fire storage calls for empty prefixes (first render placeholders).
    enabled: !!bucket && !!prefix,
  });
};
