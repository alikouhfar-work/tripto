'use server';

import { prisma } from '@repo/database';

export type DashboardStats = {
  totals: {
    accommodations: number;
    houses: number;
    hotels: number;
    destinations: number;
    activities: number;
    activityTypes: number;
    accommodationTags: number;
    currencies: number;
    users: number;
    favorites: number;
  };
  monthly: { label: string; accommodations: number; activities: number }[];
  topCountries: { country: string; count: number }[];
  topActivityTypes: { title: string; emoji: string | null; count: number }[];
  recentAccommodations: {
    id: string;
    title: string;
    city: string;
    country: string;
    createdAt: Date;
  }[];
  recentActivities: {
    id: string;
    title: string;
    city: string;
    price: number;
    createdAt: Date;
  }[];
};

const monthKey = (date: Date) => `${date.getFullYear()}-${date.getMonth()}`;

/**
 * Aggregated stats for the admin dashboard (root route).
 * All queries run in parallel; monthly buckets are computed in JS
 * from lightweight `createdAt` selects.
 */
export const getDashboardStats = async (): Promise<DashboardStats> => {
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setDate(1);
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);

  const [
    accommodations,
    houses,
    hotels,
    destinations,
    activities,
    activityTypes,
    accommodationTags,
    currencies,
    users,
    favorites,
    accommodationDates,
    activityDates,
    countryGroups,
    activityTypeGroups,
    recentAccommodations,
    recentActivities,
  ] = await Promise.all([
    prisma.accommodation.count(),
    prisma.house.count(),
    prisma.hotel.count(),
    prisma.destination.count(),
    prisma.activity.count(),
    prisma.activityType.count(),
    prisma.accommodationTag.count(),
    prisma.currency.count(),
    prisma.user.count(),
    prisma.favoriteAccommodation.count(),
    prisma.accommodation.findMany({
      where: { createdAt: { gte: sixMonthsAgo } },
      select: { createdAt: true },
    }),
    prisma.activity.findMany({
      where: { createdAt: { gte: sixMonthsAgo } },
      select: { createdAt: true },
    }),
    prisma.destination.groupBy({
      by: ['country'],
      _count: { country: true },
      orderBy: { _count: { country: 'desc' } },
      take: 5,
    }),
    prisma.activity.groupBy({
      by: ['activityTypeId'],
      _count: { activityTypeId: true },
      orderBy: { _count: { activityTypeId: 'desc' } },
      take: 6,
    }),
    prisma.accommodation.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
      select: {
        id: true,
        title: true,
        createdAt: true,
        city: true,
        country: true,
      },
    }),
    prisma.activity.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
      select: {
        id: true,
        title: true,
        price: true,
        createdAt: true,
        city: true,
      },
    }),
  ]);

  // Last-6-month buckets (oldest → newest).
  const months: { key: string; label: string }[] = Array.from({ length: 6 }, (_, i) => {
    const d = new Date();
    d.setDate(1);
    d.setMonth(d.getMonth() - (5 - i));
    return {
      key: monthKey(d),
      label: d.toLocaleString('en-US', { month: 'short' }),
    };
  });
  const accommodationBuckets = new Map<string, number>();
  const activityBuckets = new Map<string, number>();
  for (const { createdAt } of accommodationDates) {
    const key = monthKey(createdAt);
    accommodationBuckets.set(key, (accommodationBuckets.get(key) ?? 0) + 1);
  }
  for (const { createdAt } of activityDates) {
    const key = monthKey(createdAt);
    activityBuckets.set(key, (activityBuckets.get(key) ?? 0) + 1);
  }
  const monthly = months.map((m) => ({
    label: m.label,
    accommodations: accommodationBuckets.get(m.key) ?? 0,
    activities: activityBuckets.get(m.key) ?? 0,
  }));

  const typeIds = activityTypeGroups.map((g) => g.activityTypeId);
  const types = typeIds.length
    ? await prisma.activityType.findMany({
        where: { id: { in: typeIds } },
        select: { id: true, title: true, emoji: true },
      })
    : [];
  const typeById = new Map(types.map((t) => [t.id, t]));
  const topActivityTypes = activityTypeGroups.map((g) => ({
    title: typeById.get(g.activityTypeId)?.title ?? 'Unknown',
    emoji: typeById.get(g.activityTypeId)?.emoji ?? null,
    count: g._count.activityTypeId,
  }));

  return {
    totals: {
      accommodations,
      houses,
      hotels,
      destinations,
      activities,
      activityTypes,
      accommodationTags,
      currencies,
      users,
      favorites,
    },
    monthly,
    topCountries: countryGroups.map((g) => ({ country: g.country, count: g._count.country })),
    topActivityTypes,
    recentAccommodations: recentAccommodations.map((a) => ({
      id: a.id,
      title: a.title,
      city: a.city,
      country: a.country,
      createdAt: a.createdAt,
    })),
    recentActivities: recentActivities.map((a) => ({
      id: a.id,
      title: a.title,
      city: a.city,
      price: a.price,
      createdAt: a.createdAt,
    })),
  };
};
