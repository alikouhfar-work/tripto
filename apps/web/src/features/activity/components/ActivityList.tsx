import React, { FC } from 'react';
import { ActivityListProps } from '@/features/activity/types/activityList';
import { useGetActivities } from '@/features/activity/hooks/useGetActivities';
import { ActivityListSkeleton } from '@/features/activity/components/ActivityListSkeleton';
import { AnimatePresence } from 'motion/react';
import { ActivityItem } from '@/features/activity/components/ActivityItem';

export const ActivityList: FC<ActivityListProps> = ({ city, activityTypeId }) => {
  const { isFetching, data: activities } = useGetActivities(city, activityTypeId);

  if (isFetching) return <ActivityListSkeleton />;

  return (
    <ul className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-6">
      <AnimatePresence mode="popLayout">
        {activities?.map((activity, index) => (
          <ActivityItem key={activity.id} index={index} activity={activity} />
        ))}
      </AnimatePresence>
    </ul>
  );
};
