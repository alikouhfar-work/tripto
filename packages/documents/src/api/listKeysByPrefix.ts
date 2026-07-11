'use server';

import { storage } from '@repo/storage';
import { DOCUMENT_ERRORS } from '../constants';
import { ListKeysByPrefixParams } from '../types';

export async function listKeysByPrefix({ bucket, prefix }: ListKeysByPrefixParams) {
  if (!bucket) throw new Error(DOCUMENT_ERRORS.BUCKET_REQUIRED);
  if (!prefix) throw new Error(DOCUMENT_ERRORS.PREFIX_REQUIRED);

  return storage.list({
    bucket,
    prefix,
  });
}
