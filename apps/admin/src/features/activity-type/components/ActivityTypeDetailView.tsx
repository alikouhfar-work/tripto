import Link from 'next/link';
import {
  DetailBoolean,
  DetailPills,
  DetailView,
  detailText,
  formatDetailDate,
} from '@/components/shared/DetailView';
import { PageBreadcrumb } from '@/components/shared/PageBreadcrumb';
import { getActivityType } from '../server/queries';

type ActivityTypeDetailViewProps = {
  activityType: Awaited<ReturnType<typeof getActivityType>>;
};

export const ActivityTypeDetailView = ({ activityType }: ActivityTypeDetailViewProps) => {
  return (
    <article className="mx-auto w-full">
      <PageBreadcrumb
        pages={[{ route: '/activity-types', title: 'Activity Types' }]}
        className="mb-5"
        currentPageTitle={activityType.title}
      />
      <DetailView
        title={`${activityType.emoji ?? ''} ${activityType.title}`.trim()}
        backHref="/activity-types"
        backLabel="activity types"
        editHref={`/activity-types/${activityType.id}/edit`}
        rows={[
          { label: 'Name', value: detailText(activityType.name) },
          {
            label: 'Active',
            value: <DetailBoolean value={activityType.isActive} trueLabel="Active" falseLabel="Inactive" />,
          },
          {
            label: 'Activities',
            value: activityType.activities?.length ? (
              <div className="flex flex-wrap gap-2">
                {activityType.activities.map((act) => (
                  <Link
                    key={act.id}
                    href={`/activities/${act.id}`}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-1.5 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 dark:hover:border-blue-500 transition-all"
                  >
                    {act.title}
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
          { label: 'Created at', value: formatDetailDate(activityType.createdAt) },
          { label: 'Updated at', value: formatDetailDate(activityType.updatedAt) },
        ]}
      />
    </article>
  );
};
