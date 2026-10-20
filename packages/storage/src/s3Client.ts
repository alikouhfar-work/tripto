import { S3Client } from '@aws-sdk/client-s3';

/**
 * S3-compatible client for production storage (Filebase).
 * Uses `STORAGE_S3_*` env vars; falls back to the public Filebase endpoint
 * so production works without extra endpoint configuration.
 */
export const s3Client = new S3Client({
    forcePathStyle: true,
    region: process.env.STORAGE_S3_REGION || 'us-east-1',
    endpoint: process.env.STORAGE_S3_ENDPOINT || 'https://s3.filebase.com',
    credentials: {
        accessKeyId: process.env.STORAGE_S3_ACCESS_KEY_ID!,
        secretAccessKey: process.env.STORAGE_S3_SECRET_ACCESS_KEY!,
    }
})
