import { ActivityDetailView } from '@/features/activity';
import { getActivity } from '@/features/activity/server/queries';
import { notFound } from 'next/navigation';
import { cache } from 'react';

type ActivityDetailPageParams = { id: string };

// Shared with the page body so metadata + content issue a single query per request.
const getActivityCached = cache(getActivity);

export const generateMetadata = async ({
  params,
}: {
  params: Promise<ActivityDetailPageParams>;
}) => {
  const { id } = await params;
  try {
    const activity = await getActivityCached(id);
    return { title: `${activity.title} — Details` };
  } catch {
    return { title: 'Activity details' };
  }
};

const ActivityDetailPage = async ({
  params,
}: {
  params: Promise<ActivityDetailPageParams>;
}) => {
  const { id } = await params;
  let activity;
  try {
    activity = await getActivityCached(id);
  } catch {
    notFound();
  }
  return <ActivityDetailView activity={activity} />;
};

export default ActivityDetailPage;
