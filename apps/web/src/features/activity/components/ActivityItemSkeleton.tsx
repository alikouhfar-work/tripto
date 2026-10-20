import { FC } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export const ActivityItemSkeleton: FC = () => {
  return (
    <li className="flex flex-col items-center gap-3">
      <Skeleton className="aspect-[2/3] w-full rounded-t-full" />
      <div className='flex flex-col items-center gap-1'>
        <Skeleton className="h-5 w-32 rounded" />
        <Skeleton className="h-5 w-24 rounded" />
      </div>
    </li>
  );
};
