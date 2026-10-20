'use server';

import { prisma } from '@repo/database';
import type { ServerTableParams, ServerTableResponse } from '@/components/shared/DataTable/types';
import type { ActivityType } from '@repo/database';
import { ACTIVITY_TYPE_ERRORS } from '@/features/activity-type/constants';

export const getActivityTypes = async (
  params: ServerTableParams,
): Promise<ServerTableResponse<ActivityType>> => {
  try {
    const { page, pageSize, filter, sort } = params;
    const skip = (page - 1) * pageSize;

    const where = filter
      ? {
          OR: [
            { name: { contains: filter, mode: 'insensitive' as const } },
            { icon: { contains: filter, mode: 'insensitive' as const } },
            { emoji: { contains: filter, mode: 'insensitive' as const } },
            { title: { contains: filter, mode: 'insensitive' as const } },
          ],
        }
      : {};

    const sortField = sort?.[0];
    const orderBy = sortField ? { [sortField.id]: sortField.desc ? 'desc' : 'asc' } : { createdAt: 'desc' as const };

    const [data, total] = await Promise.all([
      prisma.activityType.findMany({ where, orderBy, skip, take: pageSize }),
      prisma.activityType.count({ where }),
    ]);

    return { data, total };
  } catch {
    throw new Error(ACTIVITY_TYPE_ERRORS.GET_LIST_FAILED);
  }
};

export const getActivityType = async (
  id: string,
): Promise<ActivityType & { activityCount: number; activities?: Array<{ id: string; title: string }> }> => {
  const activityType = await prisma.activityType.findUnique({
    where: { id },
    include: {
      _count: { select: { activities: true } },
      activities: {
        select: { id: true, title: true },
        orderBy: { title: 'asc' },
      },
    },
  });
  if (!activityType) throw new Error(ACTIVITY_TYPE_ERRORS.NOT_FOUND);
  return {
    ...activityType,
    activityCount: activityType._count.activities,
    activities: activityType.activities,
  };
};

export const getActivityTypesDropdown = async (
  onlyActive = true,
): Promise<{ value: string; label: string }[]> => {
  const activityTypes = await prisma.activityType.findMany({
    where: onlyActive ? { isActive: true } : {},
    orderBy: { title: 'asc' },
    select: { id: true, title: true, emoji: true },
  });

  return activityTypes.map((activityType) => ({
    value: activityType.id,
    label: `${activityType.emoji} • ${activityType.title}`,
  }));
};
