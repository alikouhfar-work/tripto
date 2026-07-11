'use server'
import { headers } from 'next/headers';

export async function serverFetch(path: string) {
  const headerList = await headers();
  const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
  const baseUrl = `${protocol}://${headerList.get('host')}`;

  return fetch(`${baseUrl}${path}`);
}
