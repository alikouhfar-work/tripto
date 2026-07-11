import { minioProvider } from "./minio";
import { s3Provider } from "./s3";
import { StorageProvider } from "../types";

export function getStorageProvider(): StorageProvider {
  switch (process.env.STORAGE_PROVIDER) {
    case "minio":
      return minioProvider;

    case "s3":
      return s3Provider;

    default:
      throw new Error(
        `Unsupported storage provider: ${process.env.STORAGE_PROVIDER}`,
      );
  }
}
