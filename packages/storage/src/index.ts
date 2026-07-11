import {
  DeleteObjectParams,
  GetObjectUrlParams,
  GetObjectUrlsParams,
  ListObjectsParams,
  StorageProvider,
  UploadObjectParams,
} from "./types";
import { getStorageProvider } from "./providers";

export const storage: StorageProvider = {
  async upload(params: UploadObjectParams) {
    return getStorageProvider().upload(params);
  },

  async getUrl(params: GetObjectUrlParams) {
    return getStorageProvider().getUrl(params);
  },

  async getUrls(params: GetObjectUrlsParams) {
    return getStorageProvider().getUrls(params);
  },

  async list(params: ListObjectsParams) {
    return getStorageProvider().list(params);
  },

  async delete(params: DeleteObjectParams) {
    return getStorageProvider().delete(params);
  },
};
