'use server'

import { storage } from "@repo/storage";
import { GetDocumentParams, GetDocumentResponse } from '../types';
import { DOCUMENT_ERRORS } from '../constants';

export async function getDocument({
  bucket,
  object,
}: Omit<GetDocumentParams, "category">): Promise<GetDocumentResponse> {
  if (!bucket) throw new Error(DOCUMENT_ERRORS.BUCKET_REQUIRED);
  if (!object) throw new Error(DOCUMENT_ERRORS.OBJECT_REQUIRED);

  const url = await storage.getUrl({
    bucket,
    object,
  });

  if (!url) {
    return {
      isSuccess: false,
    };
  }

  return {
    isSuccess: true,
    url,
  };
}
