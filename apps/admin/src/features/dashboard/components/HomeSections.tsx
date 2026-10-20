import { IconBuildingEstate, IconTicket } from '@tabler/icons-react';
import { formatDetailDate } from '@/components/shared/DetailView';
import type { DashboardStats } from '@/features/dashboard/server/queries';
import {
  DashboardSection,
  InventoryDonutChart,
  MonthlyAreaChart,
  RankedBars,
  RecentList,
} from '@/features/dashboard/components/DashboardCharts';

type HomeSectionsProps = {
  stats: DashboardStats;
};

/** Growth chart, inventory mix + rankings, and recent lists. */
export const HomeSections = ({ stats }: HomeSectionsProps) => {
  const { totals } = stats;

  return (
    <>
      <DashboardSection
        title="New listings"
        description="Accommodations and activities created per month · last 6 months"
      >
        <MonthlyAreaChart data={stats.monthly} />
      </DashboardSection>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <DashboardSection title="Inventory mix" description="Houses vs hotels">
          <InventoryDonutChart houses={totals.houses} hotels={totals.hotels} />
        </DashboardSection>
        <DashboardSection
          title="Top countries"
          description="Destinations by country"
          actionHref="/destinations"
        >
          <RankedBars
            items={stats.topCountries.map((c) => ({ label: c.country, count: c.count }))}
          />
        </DashboardSection>
        <DashboardSection
          title="Top activity types"
          description="Activities by type"
          actionHref="/activities"
        >
          <RankedBars
            items={stats.topActivityTypes.map((t) => ({
              label: `${t.emoji ?? ''} ${t.title}`.trim(),
              count: t.count,
            }))}
          />
        </DashboardSection>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <DashboardSection
          title="Recent accommodations"
          actionHref="/accommodations"
          actionLabel="View all"
        >
          <RecentList
            emptyText="No accommodations yet."
            icon={<IconBuildingEstate size={18} />}
            iconClassName="bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400"
            items={stats.recentAccommodations.slice(0, 4).map((a) => ({
              id: a.id,
              href: `/accommodations/${a.id}`,
              title: a.title,
              meta: `${[a.city, a.country].filter(Boolean).join(', ') || 'No location'} · ${formatDetailDate(a.createdAt)}`,
            }))}
          />
        </DashboardSection>
        <DashboardSection title="Recent activities" actionHref="/activities" actionLabel="View all">
          <RecentList
            emptyText="No activities yet."
            icon={<IconTicket size={18} />}
            iconClassName="bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400"
            items={stats.recentActivities.slice(0, 4).map((a) => ({
              id: a.id,
              href: `/activities/${a.id}`,
              title: a.title,
              meta: `${a.city || 'No city'} · ${formatDetailDate(a.createdAt)}`,
            }))}
          />
        </DashboardSection>
      </div>
    </>
  );
};
