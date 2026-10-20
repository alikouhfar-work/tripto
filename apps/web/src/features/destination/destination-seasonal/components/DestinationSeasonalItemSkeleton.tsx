import { FC } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export const DestinationSeasonalItemSkeleton: FC = () => {
  return (
    <li className="group relative h-120 rounded-2xl border border-slate-100 bg-slate-50 shadow-xs">
      <div className="absolute right-5 bottom-5 left-5 space-y-2 text-white">
        <Skeleton className="h-6.25 w-44 rounded-sm" />
        <Skeleton className="h-4.75 w-16 rounded" />
        <div className="mt-2 flex items-center justify-between border-t border-slate-100 pt-2.5">
          <Skeleton className="h-3.75 w-20 rounded" />
          <Skeleton className="h-5 w-18 rounded" />
        </div>
      </div>
    </li>
  );
};
