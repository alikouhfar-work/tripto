import { FC } from 'react';
import { IconFlame } from '@tabler/icons-react';
import { DestinationWeekendSlider } from '@/features/destination/destination-weekend/components/DestinationWeekendSlider';

export const DestinationWeekend: FC = () => {
  return (
    <section id="weekend-deals" className="space-y-8 pb-24">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-1">
          <span className="inline-flex items-center space-x-1.5 rounded-md bg-red-50 px-2.5 py-0.5 font-mono text-[10px] font-extrabold tracking-wider text-red-600 uppercase">
            <IconFlame className="h-3.5 w-3.5 animate-pulse fill-red-500 text-red-500" />
            <span>Limited Offers</span>
          </span>
          <h2 className="font-display text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
            Deals for the Weekend
          </h2>
          <p className="text-xs text-slate-400 sm:text-sm">
            Flash price reductions on premium hotel penthouses and coastal suites. Secure before
            Friday.
          </p>
        </div>
      </div>
      <DestinationWeekendSlider />
    </section>
  );
};
