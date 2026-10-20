import type { StatDelta } from '@/features/dashboard/components/StatCard';
import type { DashboardStats } from '@/features/dashboard/server/queries';

/** Month-over-month change between the last two monthly buckets. */
export const monthDelta = (values: number[]): StatDelta | undefined => {
  if (values.length < 2) return undefined;
  const prev = values[values.length - 2] ?? 0;
  const last = values[values.length - 1] ?? 0;
  if (prev === 0) return last > 0 ? { text: 'new', up: true } : undefined;
  const pct = Math.round(((last - prev) / prev) * 100);
  return { text: `${pct >= 0 ? '+' : ''}${pct}%`, up: pct >= 0 };
};

export type HomeSummary = {
  today: string;
  listings: number;
  accMonthly: number[];
  actMonthly: number[];
  topCountryShare: number;
};

/** Pure calculations derived from dashboard stats (no JSX). */
export const summarizeDashboard = (stats: DashboardStats): HomeSummary => {
  const { totals } = stats;
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });
  const listings = totals.accommodations + totals.activities;
  const accMonthly = stats.monthly.map((m) => m.accommodations);
  const actMonthly = stats.monthly.map((m) => m.activities);
  const topCountry = stats.topCountries[0];
  const topCountryShare =
    topCountry && totals.destinations > 0
      ? Math.round((topCountry.count / totals.destinations) * 100)
      : 0;

  return { today, listings, accMonthly, actMonthly, topCountryShare };
};
