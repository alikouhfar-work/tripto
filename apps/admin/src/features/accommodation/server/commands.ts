'use server';

import { prisma } from '@repo/database';
import { revalidatePath } from 'next/cache';
import { requireUserId } from '@/server/require-user';
import { ACCOMMODATION_ERRORS } from '@/features/accommodation/constants';
import { deleteDocument, listKeysByPrefix } from '@repo/documents/server';

export const deleteAccommodation = async (id: string) => {
  await requireUserId();

  const existing = await prisma.accommodation.findUnique({ where: { id } });
  if (!existing) throw new Error(ACCOMMODATION_ERRORS.NOT_FOUND);

  await prisma.accommodation.delete({ where: { id } });

  // Storage cleanup is best-effort: list every key under the entity prefix
  // (hero + gallery + all room galleries) and delete them one by one —
  // storage.delete() only removes a single exact object, never a prefix.
  const keys = await listKeysByPrefix({
    prefix: `${id}/`,
    bucket: 'accommodations',
  }).catch(() => [] as string[]);
  await Promise.allSettled([
    ...keys.map((key) => deleteDocument({ bucket: 'accommodations', object: key })),
    // Legacy/edge keys in case listing missed anything.
    deleteDocument({ bucket: 'accommodations', object: `${id}/hero.webp` }),
  ]);

  revalidatePath('/accommodations');
  return { id };
};
