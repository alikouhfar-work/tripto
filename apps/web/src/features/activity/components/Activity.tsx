'use client';

import { FC, useEffect, useState } from 'react';
import { ActivityTypeList, useGetActivityTypes } from '@/features/activity-type';
import { ActivityEmpty } from '@/features/activity/components/ActivityEmpty';
import { ActivityList } from '@/features/activity/components/ActivityList';
import { ActivityTypeListSkeleton } from '@/features/activity-type/components/ActivityTypeListSkeleton';

export const Activity: FC = () => {
  const { data, isFetching } = useGetActivityTypes();
  const [activityTypeId, setActivityTypeId] = useState('');

  const city = data?.city ?? 'Barcelona';
  const activityTypes = data?.activityTypes ?? [];

  useEffect(() => {
    if (!activityTypeId && activityTypes?.length) {
      setActivityTypeId(activityTypes[0].id);
    }
  }, [activityTypes, activityTypeId]);

  const handleActivityTypeChange = (activityTypeId: string) => setActivityTypeId(activityTypeId);

  return (
    <section id="activities-section" className="relative bg-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Top Things to Do in Barcelona
          </h2>
          <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-blue-600" />
          <p className="mt-4 text-sm text-slate-500 sm:text-base">
            Turn your getaway into an unforgettable journey with handpicked local experiences,
            private tours, and culinary masterclasses.
          </p>
        </div>

        {isFetching ? (
          <ActivityTypeListSkeleton />
        ) : activityTypes.length > 0 ? (
          <ActivityTypeList
            activityTypes={activityTypes}
            selectedActivityTypeId={activityTypeId}
            onActivityTypeChange={handleActivityTypeChange}
          />
        ) : (
          <ActivityEmpty city={city} />
        )}
        <ActivityList city={city} activityTypeId={activityTypeId} />
      </div>
    </section>
  );
};
