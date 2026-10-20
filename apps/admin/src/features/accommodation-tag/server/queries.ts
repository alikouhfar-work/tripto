'use server';

import { prisma } from '@repo/database';
import type { ServerTableParams, ServerTableResponse } from '@/components/shared/DataTable/types';
import type { AccommodationTag } from '@repo/database';
import { ACCOMMODATION_TAG_ERRORS } from '@/features/accommodation-tag/constants';

export const getAccommodationTags = async (
  params: ServerTableParams,
): Promise<ServerTableResponse<AccommodationTag>> => {
  try {
    const { page, pageSize, filter, sort } = params;
    const skip = (page - 1) * pageSize;

    const where = filter
      ? {
          OR: [
            { emoji: { contains: filter, mode: 'insensitive' as const } },
            { title: { contains: filter, mode: 'insensitive' as const } },
          ],
        }
      : {};

    const sortField = sort?.[0];
    const orderBy = sortField ? { [sortField.id]: sortField.desc ? 'desc' : 'asc' } : { createdAt: 'desc' as const };

    const [data, total] = await Promise.all([
      prisma.accommodationTag.findMany({ where, orderBy, skip, take: pageSize }),
      prisma.accommodationTag.count({ where }),
    ]);

    return { data, total };
  } catch {
    throw new Error(ACCOMMODATION_TAG_ERRORS.GET_LIST_FAILED);
  }
};

export const getAccommodationTag = async (
  id: string,
): Promise<AccommodationTag & { accommodationCount: number; accommodations?: Array<{ id: string; title: string }> }> => {
  const accommodationTag = await prisma.accommodationTag.findUnique({
    where: { id },
    include: {
      _count: { select: { accommodations: true } },
      accommodations: {
        select: { id: true, title: true },
        orderBy: { title: 'asc' },
      },
    },
  });
  if (!accommodationTag) throw new Error(ACCOMMODATION_TAG_ERRORS.NOT_FOUND);
  return {
    ...accommodationTag,
    accommodationCount: accommodationTag._count.accommodations,
    accommodations: accommodationTag.accommodations,
  };
};

export const getAccommodationTagsDropdown = async (
  onlyActive = true,
): Promise<{ value: string; label: string }[]> => {
  const accommodationTags = await prisma.accommodationTag.findMany({
    where: onlyActive ? { isActive: true } : {},
    orderBy: { title: 'asc' },
    select: { id: true, title: true, emoji: true },
  });

  return accommodationTags.map((accommodationTag) => ({
    value: accommodationTag.id,
    label: `${accommodationTag.emoji} • ${accommodationTag.title}`,
  }));
};
