import {
  IconBuilding,
  IconBuildingEstate,
  IconCategory,
  IconCurrencyDollar,
  IconHome,
  IconMapPin,
  IconTag,
  IconTicket,
  IconUsers,
} from '@tabler/icons-react';
import { StatCard, StatStrip } from '@/features/dashboard/components/StatCard';
import type { DashboardStats } from '@/features/dashboard/server/queries';
import { monthDelta } from '@/features/dashboard/lib/homeStats';

type HomeKpisProps = {
  totals: DashboardStats['totals'];
  topCountry: DashboardStats['topCountries'][number] | undefined;
  topCountryShare: number;
  accMonthly: number[];
  actMonthly: number[];
};

/** Hero KPI cards + supporting stats strip. */
export const HomeKpis = ({
  totals,
  topCountry,
  topCountryShare,
  accMonthly,
  actMonthly,
}: HomeKpisProps) => (
  <>
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard
        label="Accommodations"
        value={totals.accommodations}
        hint={`${totals.houses} houses · ${totals.hotels} hotels`}
        icon={IconBuildingEstate}
        tileClassName="from-blue-500 to-indigo-500"
        delta={monthDelta(accMonthly)}
      />
      <StatCard
        label="Activities"
        value={totals.activities}
        hint={`${totals.activityTypes} activity types`}
        icon={IconTicket}
        tileClassName="from-emerald-500 to-teal-500"
        delta={monthDelta(actMonthly)}
      />
      <StatCard
        label="Destinations"
        value={totals.destinations}
        hint={topCountry ? `Top country · ${topCountry.country} (${topCountryShare}% share)` : 'No destinations yet'}
        icon={IconMapPin}
        tileClassName="from-violet-500 to-purple-500"
      />
      <StatCard
        label="Users"
        value={totals.users}
        hint="registered guests"
        icon={IconUsers}
        tileClassName="from-amber-500 to-orange-500"
      />
    </div>

    <StatStrip
      items={[
        {
          label: 'Houses',
          value: totals.houses,
          icon: IconHome,
          iconClassName: 'bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-400',
        },
        {
          label: 'Hotels',
          value: totals.hotels,
          icon: IconBuilding,
          iconClassName: 'bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-400',
        },
        {
          label: 'Activity types',
          value: totals.activityTypes,
          icon: IconCategory,
          iconClassName: 'bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-400',
        },
        {
          label: 'Tags',
          value: totals.accommodationTags,
          icon: IconTag,
          iconClassName: 'bg-teal-100 text-teal-700 dark:bg-teal-500/15 dark:text-teal-400',
        },
        {
          label: 'Currencies',
          value: totals.currencies,
          icon: IconCurrencyDollar,
          iconClassName: 'bg-zinc-200 text-zinc-700 dark:bg-zinc-500/15 dark:text-zinc-300',
        },
      ]}
    />
  </>
);
