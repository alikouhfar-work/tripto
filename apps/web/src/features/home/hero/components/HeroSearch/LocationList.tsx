import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover';
import { FC, useState } from 'react';
import { LocationListProps } from '../../types/locationList';
import { IconMapPin } from '@tabler/icons-react';
import { AnimatePresence, motion } from 'motion/react';
import { locations } from '@/features/home/hero/lib/locations';

export const LocationList: FC<LocationListProps> = ({ onChange }) => {
  const [selectedLocation, setSelectedLocation] = useState('');

  return (
    <Popover>
      <PopoverTrigger asChild>
        <li className="relative cursor-pointer rounded-2xl border border-slate-300 bg-white p-4 pb-3.5 shadow-sm transition-all focus-within:border-blue-500 hover:border-blue-500 lg:col-span-2">
          <label className="mb-1 flex items-center space-x-1 text-[10px] font-extrabold tracking-wider text-slate-500 uppercase">
            <IconMapPin className="h-3.5 w-3.5 text-blue-600" />
            <span>Where are you going?</span>
          </label>
          <p className="text-sm font-bold text-gray-800">e.g. Amalfi, Santorini, Phuket...</p>
        </li>
      </PopoverTrigger>
      <PopoverContent align="start" className="z-40 pt-2 focus-visible:outline-0!">
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="rounded-xl border border-slate-200 bg-white p-3 shadow-2xl"
          >
            <div className="px-3 py-1.5 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
              Trending Destinations
            </div>
            <div className="mt-1.5 grid grid-cols-2 gap-1.5 sm:grid-cols-4">
              {locations.map((location) => (
                <button
                  type="button"
                  key={location.value}
                  onClick={() => {
                    onChange(location.value);
                    setSelectedLocation(location.value);
                  }}
                  aria-selected={selectedLocation === location.value}
                  className="flex items-center space-x-2 rounded-lg px-3 py-2 text-left text-sm font-semibold text-gray-800 transition-colors hover:bg-blue-50 hover:text-blue-600 aria-selected:bg-blue-50 aria-selected:text-blue-600"
                >
                  <IconMapPin className="size-4 shrink-0 text-gray-500" />
                  <div>
                    <p className="font-semibold">{location.cityName}</p>
                    <span className="text-xs -mt-1 block font-medium text-zinc-400">
                      {location.countryName}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </PopoverContent>
    </Popover>
  );
};
