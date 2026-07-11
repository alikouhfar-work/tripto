'use server';

import { storage } from '@repo/storage';
import { DeleteDocumentParams } from '../types';
import { DOCUMENT_ERRORS } from '../constants';

export async function deleteDocument({ bucket, object }: DeleteDocumentParams) {
  if (!bucket) throw new Error(DOCUMENT_ERRORS.BUCKET_REQUIRED);
  if (!object) throw new Error(DOCUMENT_ERRORS.OBJECT_REQUIRED);

  await storage.delete({ bucket, object });

  return {
    success: true,
  };
}
