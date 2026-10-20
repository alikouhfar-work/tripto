'use server';

import { headers } from 'next/headers';
import { prisma } from '@repo/database';
import { ACTIVITY_TYPE_ERRORS } from '@/features/activity-type/constants';
import type { GetActivityTypesResponse } from '@/features/activity-type/types/activityType';

export async function getActivityTypes(): GetActivityTypesResponse {
  const headersList = await headers();
  const city = headersList.get('x-vercel-ip-city') ?? 'Barcelona';

  try {
    const data = await prisma.activityType.findMany({
      where: {
        isActive: true,
        activities: {
          some: city
            ? {
                city: {
                  equals: city,
                  mode: 'insensitive',
                },
              }
            : {},
        },
      },
    });

    return { city, activityTypes: data };
  } catch {
    throw new Error(ACTIVITY_TYPE_ERRORS.GET_LIST_FAILED);
  }
}
