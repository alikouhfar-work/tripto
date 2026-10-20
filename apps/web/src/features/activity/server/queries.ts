'use server';

import { prisma } from '@repo/database';
import { ACTIVITY_ERRORS } from '@/features/activity/constants';
import type { GetActivitiesResponse } from '@/features/activity/types/activity';

export async function getActivities(
  city: string,
  activityTypeId: string,
): GetActivitiesResponse {
  try {
    const data = await prisma.activity.findMany({
      where: {
        isActive: true,
        activityType: {
          id: activityTypeId,
        },
        city: {
          equals: city,
          mode: 'insensitive',
        },
      },
      select: {
        id: true,
        title: true,
        city: true,
        country: true,
        countryCode: true,
        addressDetails: true,
        activityType: true,
      },
      take: 6,
    });

    return data;
  } catch {
    throw new Error(ACTIVITY_ERRORS.GET_LIST_FAILED);
  }
}
