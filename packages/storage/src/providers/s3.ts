import {
  DeleteObjectCommand,
  GetObjectCommand,
  HeadObjectCommand,
  ListObjectsV2Command,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { StorageProvider } from "../types";
import { s3Client } from "../s3Client";

export const s3Provider: StorageProvider = {
  async upload({ bucket, object, file }) {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    await s3Client.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: object,
        Body: buffer,
        ContentType: file.type || "application/octet-stream",
      }),
    );
  },

  async delete({ bucket, object }) {
    await s3Client.send(
      new DeleteObjectCommand({
        Bucket: bucket,
        Key: object,
      }),
    );
  },

  async getUrl({ bucket, object }) {
    try {
      await s3Client.send(
        new HeadObjectCommand({
          Bucket: bucket,
          Key: object,
        }),
      );

      return getSignedUrl(
        s3Client,
        new GetObjectCommand({
          Bucket: bucket,
          Key: object,
        }),
        {
          expiresIn: 60 * 60,
        },
      );
    } catch {
      return null;
    }
  },

  async getUrls({ bucket, prefix }) {
    let objects: string[] = [];

    try {
      const response = await s3Client.send(
        new ListObjectsV2Command({
          Bucket: bucket,
          Prefix: prefix,
        }),
      );

      objects =
        response.Contents?.map((item) => item.Key).filter(
          (key): key is string => Boolean(key),
        ) ?? [];

      return await Promise.all(
        objects.map(async (object) => {
          const command = new GetObjectCommand({
            Bucket: bucket,
            Key: object,
          });

          return getSignedUrl(s3Client, command, {
            expiresIn: 60 * 60,
          });
        }),
      );
    } catch {
      return [];
    }
  },

  async list({ bucket, prefix }) {
    const response = await s3Client.send(
      new ListObjectsV2Command({
        Bucket: bucket,
        Prefix: prefix,
      }),
    );

    return (
      response.Contents?.map((item) => item.Key).filter((key): key is string =>
        Boolean(key),
      ) ?? []
    );
  },
};
