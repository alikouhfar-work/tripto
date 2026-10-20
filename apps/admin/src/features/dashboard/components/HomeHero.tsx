import {
  IconHeart,
  IconSparkles,
  IconTrendingUp,
} from '@tabler/icons-react';
import Link from 'next/link';
import type { DashboardStats } from '@/features/dashboard/server/queries';

type HomeHeroProps = {
  today: string;
  listings: number;
  totals: DashboardStats['totals'];
};

/** Gradient welcome band with headline totals + shortcuts. */
export const HomeHero = ({ today, listings, totals }: HomeHeroProps) => (
  <section className="relative overflow-hidden rounded-2xl border border-blue-900/20 bg-gradient-to-br from-blue-700 via-indigo-700 to-violet-700 p-6 text-white sm:p-8 dark:border-white/10 dark:from-blue-950 dark:via-indigo-950 dark:to-violet-950">
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 opacity-[0.15]"
      style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)',
        backgroundSize: '22px 22px',
      }}
    />
    <IconSparkles
      aria-hidden
      className="pointer-events-none absolute -right-6 -bottom-8 size-48 text-white/10"
      strokeWidth={1}
    />
    <div className="relative">
      <p className="text-sm text-blue-100/90 dark:text-blue-200/70">{today}</p>
      <h3 className="mt-1 flex items-center gap-2 text-3xl font-extrabold">
        Welcome to Tripto Admin
        <IconTrendingUp size={28} className="text-emerald-300" />
      </h3>
      <p className="mt-1.5 max-w-xl text-sm text-blue-100/90 dark:text-blue-200/70">
        Inventory overview and recent activity across destinations, accommodations and
        activities.
      </p>
      <div className="mt-5 flex flex-wrap items-center gap-x-8 gap-y-3">
        <span>
          <span className="block text-2xl font-extrabold tabular-nums">
            {listings.toLocaleString('en-US')}
          </span>
          <span className="block text-xs text-blue-100/80 dark:text-blue-200/60">
            total listings
          </span>
        </span>
        <span>
          <span className="block text-2xl font-extrabold tabular-nums">
            {totals.destinations.toLocaleString('en-US')}
          </span>
          <span className="block text-xs text-blue-100/80 dark:text-blue-200/60">
            destinations
          </span>
        </span>
        <span className="flex items-center gap-1.5">
          <span>
            <span className="block text-2xl font-extrabold tabular-nums">
              {totals.favorites.toLocaleString('en-US')}
            </span>
            <span className="block text-xs text-blue-100/80 dark:text-blue-200/60">
              saved favorites
            </span>
          </span>
          <IconHeart size={18} className="mt-1 fill-rose-300 text-rose-300" />
        </span>
        <span className="ms-auto flex flex-wrap gap-2">
          <Link
            href="/accommodations"
            className="inline-flex h-10 items-center rounded-lg bg-white px-4 text-sm font-semibold text-blue-800 transition-colors hover:bg-blue-50 dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
          >
            Manage stays
          </Link>
          <Link
            href="/activities"
            className="inline-flex h-10 items-center rounded-lg border border-white/30 px-4 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            View activities
          </Link>
        </span>
      </div>
    </div>
  </section>
);
