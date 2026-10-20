import { FC } from 'react';
import { DestinationPopularSlider } from './DestinationPopularSlider';
import { IconStar } from '@tabler/icons-react';

export const DestinationPopular: FC = () => {
  return (
    <section id="guest-favorites" className="space-y-8 py-24">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-1">
          <span className="inline-flex items-center space-x-1.5 rounded-md bg-blue-50 px-2.5 py-0.5 font-mono text-[10px] font-extrabold tracking-wider text-blue-700 uppercase">
            <IconStar className="h-3.5 w-3.5 animate-spin fill-blue-600 text-blue-600" />
            <span>Highest Rated</span>
          </span>
          <h2 className="font-display text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
            Homes Guests Love
          </h2>
          <p className="text-xs text-slate-400 sm:text-sm">
            Highly sought-after estates, organic guesthouses, and wild geodetic stargazing domes
            rated 4.8+ by actual travelers.
          </p>
        </div>
      </div>

      <DestinationPopularSlider />
    </section>
  );
};
