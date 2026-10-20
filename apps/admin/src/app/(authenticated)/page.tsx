import { getDashboardStats } from '@/features/dashboard/server/queries';
import { summarizeDashboard } from '@/features/dashboard/lib/homeStats';
import { HomeHero } from '@/features/dashboard/components/HomeHero';
import { HomeKpis } from '@/features/dashboard/components/HomeKpis';
import { HomeSections } from '@/features/dashboard/components/HomeSections';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard',
};

const HomePage = async () => {
  const stats = await getDashboardStats();
  const { totals } = stats;
  const { today, listings, accMonthly, actMonthly, topCountryShare } =
    summarizeDashboard(stats);
  const topCountry = stats.topCountries[0];

  return (
    <div className="flex w-full flex-col gap-5">
      <HomeHero today={today} listings={listings} totals={totals} />

      <HomeKpis
        totals={totals}
        topCountry={topCountry}
        topCountryShare={topCountryShare}
        accMonthly={accMonthly}
        actMonthly={actMonthly}
      />

      <HomeSections stats={stats} />
    </div>
  );
};

export default HomePage;
