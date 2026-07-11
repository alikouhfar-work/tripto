export type UploadObjectParams = {
  bucket: string;
  object: string;
  file: File;
};

export type DeleteObjectParams = {
  bucket: string;
  object: string;
};

export type GetObjectUrlParams = {
  bucket: string;
  object: string;
};

export type GetObjectUrlsParams = {
  prefix: string;
  bucket: string;
};

export type ListObjectsParams = {
  bucket: string;
  prefix: string;
};

export interface StorageProvider {
  upload(params: UploadObjectParams): Promise<void>;

  delete(params: DeleteObjectParams): Promise<void>;

  getUrl(params: GetObjectUrlParams): Promise<string | null>;
  getUrls(params: GetObjectUrlsParams): Promise<string[]>;

  list(params: ListObjectsParams): Promise<string[]>;
}
