import { StorageProvider } from "../types";
import { minioClient } from "../minioClient";

export const minioProvider: StorageProvider = {
  async upload({ bucket, object, file }) {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    await minioClient.putObject(bucket, object, buffer, buffer.length, {
      "Content-Type": file.type || "application/octet-stream",
    });
  },

  async delete({ bucket, object }) {
    await minioClient.removeObject(bucket, object);
  },

  async getUrl({ bucket, object }) {
    try {
      // Explicit 1h expiry (matches S3) — never rely on the 7-day SDK default
      // for bearer URLs that end up in browser history and logs.
      return await minioClient.presignedGetObject(bucket, object, 60 * 60);
    } catch {
      return null;
    }
  },

  async getUrls({ bucket, prefix }) {
    const objects: string[] = [];

    try {
      await new Promise<void>((resolve, reject) => {
        const stream = minioClient.listObjects(bucket, prefix, true);

        stream.on("data", (obj) => {
          if (obj.name) objects.push(obj.name);
        });

        stream.on("end", resolve);
        stream.on("error", reject);
      });

      return await Promise.all(
        objects.map(async (object) =>
          minioClient.presignedGetObject(bucket, object, 60 * 60),
        ),
      );
    } catch {
      return [];
    }
  },

  async list({ bucket, prefix }) {
    const keys: string[] = [];

    await new Promise<void>((resolve, reject) => {
      const stream = minioClient.listObjects(bucket, prefix, true);

      stream.on("data", (obj) => {
        if (obj.name) {
          keys.push(obj.name);
        }
      });

      stream.on("end", resolve);
      stream.on("error", reject);
    });

    return keys;
  },
};
