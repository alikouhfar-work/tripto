import {
  DetailBoolean,
  DetailHeroImage,
  DetailView,
  detailText,
  formatDetailDate,
} from '@/components/shared/DetailView';
import { PageBreadcrumb } from '@/components/shared/PageBreadcrumb';
import { convertCountryCodeToFlag } from '@/utils/convertCountryCodeToFlag';
import { IconInfoCircle } from '@tabler/icons-react';
import { getActivity } from '../server/queries';

type ActivityDetailViewProps = {
  activity: Awaited<ReturnType<typeof getActivity>>;
};

export const ActivityDetailView = ({ activity }: ActivityDetailViewProps) => {
  return (
    <article className="mx-auto w-full">
      <PageBreadcrumb
        pages={[{ route: '/activities', title: 'Activities' }]}
        className="mb-5"
        currentPageTitle={activity.title}
      />
      <DetailView
        title={
          <span className="flex items-center gap-2">
            <span>{convertCountryCodeToFlag(activity.countryCode)}</span>
            <span>{activity.title}</span>
          </span>
        }
        description={`${activity.city ? `${activity.city}` : ''}${activity.country ? `, ${activity.country}` : ''}`}
        backHref="/activities"
        backLabel="activities"
        editHref={`/activities/${activity.id}/edit`}
        hero={
          <DetailHeroImage id={activity.id} bucket="activities" title={activity.title} />
        }
        badges={
          <>
            {activity.activityType && (
              <span className="inline-flex items-center gap-1 rounded-full bg-violet-100 px-2.5 py-0.5 text-xs font-medium text-violet-800 dark:bg-violet-500/15 dark:text-violet-400">
                {activity.activityType.emoji} {activity.activityType.title}
              </span>
            )}
          </>
        }
        rows={[
          { label: 'Full address', value: detailText(activity.fullAddress) },
          {
            label: 'Price',
            value: activity.currency
              ? `${detailText(activity.price)} ${activity.currency.symbol || activity.currency.isoCode}`
              : detailText(activity.price),
          },
          { label: 'Discount (%)', value: detailText(activity.discount) },
          {
            label: 'Active',
            value: <DetailBoolean value={activity.isActive} trueLabel="Active" falseLabel="Inactive" />,
          },
          { label: 'Created at', value: formatDetailDate(activity.createdAt) },
          { label: 'Updated at', value: formatDetailDate(activity.updatedAt) },
        ]}
      />
    </article>
  );
};
