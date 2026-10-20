import Link from 'next/link';
import { DetailBoolean, detailText, DetailView, formatDetailDate, } from '@/components/shared/DetailView';
import { PageBreadcrumb } from '@/components/shared/PageBreadcrumb';
import { getDestination } from '../server/queries';
import { SEASONS } from '../lib/seasons';

type DestinationDetailViewProps = {
  destination: Awaited<ReturnType<typeof getDestination>>;
};

export const DestinationDetailView = ({ destination }: DestinationDetailViewProps) => {
  const seasonBadges = destination.seasons?.length
    ? destination.seasons.map((season) => {
        const seasonConfig = SEASONS.find((s) => s.value === season);
        if (!seasonConfig) return null;
        const Icon = seasonConfig.icon;
        return (
          <span
            key={season}
            className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 dark:border-zinc-700 px-3 py-1.5 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <Icon size={16} className="text-zinc-500 dark:text-zinc-400" />
            {seasonConfig.title}
          </span>
        );
      }).filter(Boolean)
    : [];

  return (
    <article className="mx-auto w-full">
      <PageBreadcrumb
        pages={[{ route: '/destinations', title: 'Destinations' }]}
        className="mb-5"
        currentPageTitle={destination.city}
      />
      <DetailView
        title={
          <span>{`${destination.city}, ${destination.country}`}</span>
        }
        backHref="/destinations"
        backLabel="destinations"
        editHref={`/destinations/${destination.id}/edit`}
        rows={[
          { label: 'Slogan', value: detailText(destination.slogan) },
          {
            label: 'Seasons',
            value: seasonBadges.length ? (
              <div className="flex flex-wrap gap-2">{seasonBadges}</div>
            ) : (
              '—'
            ),
          },
          {
            label: 'Active',
            value: <DetailBoolean value={destination.isActive} trueLabel="Active" falseLabel="Inactive" />,
          },
          {
            label: 'Accommodations',
            value: destination.accommodations?.length ? (
              <div className="flex flex-wrap gap-2">
                {destination.accommodations.map((acc) => (
                  <Link
                    key={acc.id}
                    href={`/accommodations/${acc.id}`}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-1.5 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 dark:hover:border-blue-500 transition-all"
                  >
                    {acc.title}
                    <svg className="size-4 opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                  </Link>
                ))}
              </div>
            ) : (
              '—'
            ),
          },
          { label: 'Created at', value: formatDetailDate(destination.createdAt) },
          { label: 'Updated at', value: formatDetailDate(destination.updatedAt) },
        ]}
      />
    </article>
  );
};
