import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover';
import { FC, useState } from 'react';
import { GuestListProps } from '@/features/home/hero/types/guestList';
import { AnimatePresence, motion } from 'motion/react';
import { IconUsers } from '@tabler/icons-react';
import { GuestCounter } from '@/features/home/hero/components/HeroSearch/GuestCounter';

export const GuestList: FC<GuestListProps> = ({ onChange }) => {
  const [selectedGuests, setSelectedGuests] = useState({ adult: 1, child: 0 });

  return (
    <Popover>
      <PopoverTrigger asChild>
        <li className="relative cursor-pointer rounded-2xl border border-slate-300 bg-white p-4 pb-3.5 shadow-sm transition-all focus-within:border-blue-500 hover:border-blue-500">
          <label className="mb-1 flex items-center space-x-1 text-[10px] font-extrabold tracking-wider text-slate-500 uppercase">
            <IconUsers className="h-3.5 w-3.5 text-blue-600" />
            <span>Guests</span>
          </label>
          <div className="text-sm font-bold text-gray-800">
            {selectedGuests.adult} {selectedGuests.adult === 1 ? 'Adult' : 'Adults'}
            {selectedGuests.child > 0 &&
              `, ${selectedGuests.child} ${selectedGuests.child === 1 ? 'Child' : 'Children'}`}
          </div>
        </li>
      </PopoverTrigger>

      <PopoverContent align="start" className="z-40 pt-2 focus-visible:outline-0!">
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="cursor-default rounded-xl border border-slate-300 bg-white p-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <GuestCounter
              title="Adults"
              subtitle="Ages 13 or above"
              count={selectedGuests.adult}
              onIncrement={() =>
                setSelectedGuests((prevState) => ({
                  ...prevState,
                  adult: Math.max(1, prevState.adult + 1),
                }))
              }
              onDecrement={() =>
                setSelectedGuests((prevState) => ({
                  ...prevState,
                  adult: Math.max(1, prevState.adult - 1),
                }))
              }
            />

            <GuestCounter
              title="Children"
              subtitle="Ages 2 – 12"
              count={selectedGuests.child}
              onIncrement={() =>
                setSelectedGuests((prevState) => ({
                  ...prevState,
                  child: Math.max(1, prevState.child + 1),
                }))
              }
              onDecrement={() =>
                setSelectedGuests((prevState) => ({
                  ...prevState,
                  child: Math.max(1, prevState.child - 1),
                }))
              }
            />

            <PopoverClose asChild>
              <button
                type="button"
                className="w-full rounded-lg bg-blue-600 py-2.5 text-center text-xs font-bold text-white transition-colors hover:bg-blue-700"
              >
                Apply Guests
              </button>
            </PopoverClose>
          </motion.div>
        </AnimatePresence>
      </PopoverContent>
    </Popover>
  );
};
