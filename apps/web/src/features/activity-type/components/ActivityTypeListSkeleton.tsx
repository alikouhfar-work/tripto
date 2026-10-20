import { FC } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export const ActivityTypeListSkeleton: FC = () => {
  const activityTypes = Array.from({ length: 5 });

  return (
    <div className="mb-12 flex justify-center">
      <ul className="flex max-w-full scrollbar-none items-center space-x-1.5 overflow-x-auto rounded-2xl border border-slate-100 bg-slate-50 p-1.5 px-2 pb-2">
      {activityTypes?.map((_, index) => (
        <li key={index}>
          <Skeleton className="h-10 w-40 rounded-lg" />
        </li>
      ))}
      </ul>
    </div>
  );
};
