import { minioProvider } from "./minio";
import { s3Provider } from "./s3";
import { StorageProvider } from "../types";

/**
 * Storage provider selection.
 *
 * - Explicit `STORAGE_PROVIDER=minio|s3` always wins (useful for overrides/tests).
 * - Otherwise development defaults to self-hosted MinIO (docker-compose),
 *   while any non-development environment (production, preview) uses the
 *   S3-compatible provider (Filebase).
 */
export function getStorageProvider(): StorageProvider {
  const configured = process.env.STORAGE_PROVIDER;

  if (configured === "minio") return minioProvider;
  if (configured === "s3") return s3Provider;

  if (configured && configured.length > 0) {
    throw new Error(`Unsupported storage provider: ${configured}`);
  }

  return process.env.NODE_ENV === "production" ? s3Provider : minioProvider;
}
