'use server';

import { storage } from '@repo/storage';
import { GetDocumentsParams, GetDocumentsResponse } from '../types';
import { DOCUMENT_ERRORS } from '../constants';

export async function getDocuments({
  bucket,
  prefix,
}: Omit<GetDocumentsParams, 'category'>): Promise<GetDocumentsResponse> {
  if (!bucket) throw new Error(DOCUMENT_ERRORS.BUCKET_REQUIRED);
  if (!prefix) throw new Error(DOCUMENT_ERRORS.PREFIX_REQUIRED);

  const urls = await storage.getUrls({
    bucket,
    prefix,
  });

  return {
    isSuccess: urls.length > 0,
    urls,
  };
}
