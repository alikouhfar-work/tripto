import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover';
import { IconCalendar } from '@tabler/icons-react';
import { formatDate } from '@/utils/formatDate';
import { DateRangePickerController } from '@/components/shared/DateRangePicker';
import { FC } from 'react';
import { CheckInOutRangeProps } from '@/features/home/hero/types/checkInOutRange';

export const CheckInOutRange: FC<CheckInOutRangeProps> = ({ value, title, onChange }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <li className="cursor-pointer rounded-2xl border border-slate-300 bg-white p-4 pb-3.5 shadow-sm transition-all focus-within:border-blue-500 hover:border-blue-500">
          <div className="mb-1 flex items-center space-x-1 text-[10px] font-extrabold tracking-wider text-slate-500 uppercase">
            <IconCalendar className="h-3.5 w-3.5 text-blue-600" />
            <span>{title}</span>
          </div>
          <h6 className="text-sm font-bold text-gray-800">
            {value
              ? formatDate(value, {
                  year: 'numeric',
                  month: 'short',
                  day: '2-digit',
                })
              : 'Pick a date'}
          </h6>
        </li>
      </PopoverTrigger>
      <PopoverContent align="start" className="z-40 pt-2">
        <DateRangePickerController
          name="range"
          numberOfMonths={2}
          disabled={{
            before: new Date(),
          }}
          onChange={onChange}
        />
      </PopoverContent>
    </Popover>
  );
};
