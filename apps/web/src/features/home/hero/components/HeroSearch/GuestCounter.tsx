import { FC } from 'react';
import { GuestCounterProps } from '@/features/home/hero/types/guestCounter';
import { IconMinus, IconPlus } from '@tabler/icons-react';

export const GuestCounter: FC<GuestCounterProps> = ({
  title,
  count,
  subtitle,
  onIncrement,
  onDecrement,
}) => {
  return (
    <div className="last-of-type:mb-3 flex items-center justify-between py-2 not-last-of-type:border-b not-last-of-type:border-gray-50">
      <div>
        <div className="text-sm font-bold text-gray-800">{title}</div>
        <div className="text-xs text-gray-400">{subtitle}</div>
      </div>
      <div className="flex items-center space-x-3">
        <button
          type="button"
          onClick={onDecrement}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50 focus:outline-none"
        >
          <IconMinus className="h-4 w-4" />
        </button>
        <span className="w-4 text-center text-sm font-bold text-gray-800">{count}</span>
        <button
          type="button"
          onClick={onIncrement}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50 focus:outline-none"
        >
          <IconPlus className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
