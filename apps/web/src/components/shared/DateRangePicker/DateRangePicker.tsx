import { clsx } from 'clsx';
import { FC } from 'react';
import { Calendar } from '../../ui/calendar';
import { DateRangePickerProps } from '@/types/dateRangePicker';

export const DateRangePicker: FC<DateRangePickerProps> = (props) => {
  const { min, max, value, onChange, disabled, className, numberOfMonths = 1 } = props;

  return (
    <Calendar
      min={min}
      max={max}
      mode="range"
      required={true}
      selected={value}
      disabled={disabled}
      numberOfMonths={numberOfMonths}
      className={clsx(className, 'rounded-xl border border-slate-200 bg-white p-3 shadow-2xl')}
      onSelect={onChange}
    />
  );
};
