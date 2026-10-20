export type DocumentCategory = "hero" | "gallery" | "roomGallery";
export type DocumentBucket = "activities" | "accommodations";

export type UseGetDocumentParams = GetDocumentParams & { id: string };
export type UseGetDocumentsParams = GetDocumentsParams & { id: string };

export type DocumentQueryKeysParams = {
  id?: string;
  bucket: DocumentBucket;
  category: DocumentCategory;
  /** Single-object key (useGetDocument). Part of the cache key. */
  object?: string;
  /** Prefix key (useGetDocuments). Part of the cache key. */
  prefix?: string;
};

export type GetDocumentParams = {
  object: string;
  bucket: DocumentBucket;
  category: DocumentCategory;
};

export type GetDocumentsParams = {
  prefix: string;
  bucket: DocumentBucket;
  category: DocumentCategory;
};

export type ListKeysByPrefixParams = {
  prefix: string;
  bucket: DocumentBucket;
};

export type GetDocumentResponse = {
  url?: string;
  isSuccess: boolean;
};

export type GetDocumentsResponse = {
  urls?: Array<string>;
  isSuccess: boolean;
};

export type DeleteDocumentParams = {
  object: string;
  bucket: DocumentBucket;
};

export type UploadDocumentParams = {
  file: File;
  object: string;
  bucket: DocumentBucket;
};
