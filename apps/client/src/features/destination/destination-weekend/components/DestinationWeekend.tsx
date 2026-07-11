import { FC } from 'react';
import { DestinationWeekendSlider } from './DestinationWeekendSlider';

export const DestinationWeekend: FC = () => {
  return (
    <section className="flex w-full justify-center bg-zinc-50">
      <div className="w-full max-w-7xl space-y-6 px-4 py-24 sm:space-y-8 2xl:px-0">
        <h3 className="text-3xl font-extrabold sm:text-4xl md:text-5xl">Deals for The Weekend</h3>
        <DestinationWeekendSlider />
      </div>
    </section>
  );
};
