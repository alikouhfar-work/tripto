'use server';

import { storage } from '@repo/storage';
import { UploadDocumentParams } from '../types';
import { DOCUMENT_ERRORS } from '../constants';

export async function uploadDocument({ bucket, object, file }: UploadDocumentParams) {
  if (!bucket) throw new Error(DOCUMENT_ERRORS.BUCKET_REQUIRED);
  if (!object) throw new Error(DOCUMENT_ERRORS.OBJECT_REQUIRED);
  if (!file) throw new Error(DOCUMENT_ERRORS.FILE_REQUIRED);

  await storage.upload({ bucket, object, file });

  return {
    success: true,
  };
}
