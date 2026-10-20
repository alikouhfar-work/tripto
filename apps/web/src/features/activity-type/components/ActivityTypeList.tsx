import { FC } from 'react';
import { ActivityTypeItem } from '@/features/activity-type/components/ActivityTypeItem';
import { ActivityTypeListProps } from '@/features/activity-type/types/activityType';

export const ActivityTypeList: FC<ActivityTypeListProps> = ({
  activityTypes,
  selectedActivityTypeId,
  onActivityTypeChange,
}) => {
  return (
    <div className="mb-12 flex justify-center">
      <ul className="flex max-w-full scrollbar-none items-center space-x-1.5 overflow-x-auto rounded-2xl border border-slate-100 bg-slate-50 p-1.5 px-2 pb-2">
        {activityTypes?.map((activityType) => (
          <ActivityTypeItem
            {...activityType}
            key={activityType.id}
            onActivityTypeChange={onActivityTypeChange}
            selectedActivityTypeId={selectedActivityTypeId}
          />
        ))}
      </ul>
    </div>
  );
};
