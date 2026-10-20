import Link from 'next/link';
import { DetailBoolean, DetailView, formatDetailDate, } from '@/components/shared/DetailView';
import { PageBreadcrumb } from '@/components/shared/PageBreadcrumb';
import { getAccommodationTag } from '../server/queries';

type AccommodationTagDetailViewProps = {
  tag: Awaited<ReturnType<typeof getAccommodationTag>>;
};

export const AccommodationTagDetailView = ({ tag }: AccommodationTagDetailViewProps) => {
  return (
    <article className="mx-auto w-full">
      <PageBreadcrumb
        pages={[{ route: '/accommodation-tags', title: 'Accommodation Tags' }]}
        className="mb-5"
        currentPageTitle={tag.title}
      />
      <DetailView
        title={`${tag.emoji ?? ''} ${tag.title}`.trim()}
        backHref="/accommodation-tags"
        backLabel="accommodation tags"
        editHref={`/accommodation-tags/${tag.id}/edit`}
        rows={[
          {
            label: 'Colors',
            value: (
              <div className="flex flex-wrap items-center gap-3">
                {[
                  { label: 'Text', color: tag.textColor },
                  { label: 'Border', color: tag.borderColor },
                  { label: 'Background', color: tag.backgroundColor },
                ].map(({ label, color }) => (
                  <div
                    key={label}
                    className="inline-flex items-center gap-3 rounded-lg border border-border bg-card p-3 min-w-[160px]"
                  >
                    <div
                      className="size-8 rounded-full border border-black/10 shadow-sm shrink-0"
                      style={{ backgroundColor: color }}
                    />
                    <div>
                      <span className="font-semibold text-foreground text-sm">{label}</span>
                      <div className="leading-2.5 font-mono text-xs text-muted-foreground">{color}</div>
                    </div>
                  </div>
                ))}
              </div>
            ),
          },
          {
            label: 'Active',
            value: <DetailBoolean value={tag.isActive} trueLabel="Active" falseLabel="Inactive" />,
          },
          {
            label: 'Accommodations',
            value: tag.accommodations?.length ? (
              <div className="flex flex-wrap gap-2">
                {tag.accommodations.map((acc) => (
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
          { label: 'Created at', value: formatDetailDate(tag.createdAt) },
          { label: 'Updated at', value: formatDetailDate(tag.updatedAt) },
        ]}
      />
    </article>
  );
};
