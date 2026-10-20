import { ActivityTypeDetailView } from '@/features/activity-type';
import { getActivityType } from '@/features/activity-type/server/queries';
import { notFound } from 'next/navigation';
import { cache } from 'react';

type ActivityTypeDetailPageParams = { id: string };

// Shared with the page body so metadata + content issue a single query per request.
const getActivityTypeCached = cache(getActivityType);

export const generateMetadata = async ({
  params,
}: {
  params: Promise<ActivityTypeDetailPageParams>;
}) => {
  const { id } = await params;
  try {
    const activityType = await getActivityTypeCached(id);
    return { title: `${activityType.title} — Details` };
  } catch {
    return { title: 'Activity type details' };
  }
};

const ActivityTypeDetailPage = async ({
  params,
}: {
  params: Promise<ActivityTypeDetailPageParams>;
}) => {
  const { id } = await params;
  let activityType;
  try {
    activityType = await getActivityTypeCached(id);
  } catch {
    notFound();
  }
  return <ActivityTypeDetailView activityType={activityType} />;
};

export default ActivityTypeDetailPage;
