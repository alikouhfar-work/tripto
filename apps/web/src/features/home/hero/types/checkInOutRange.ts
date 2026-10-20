import { DateRange } from 'react-day-picker';

export type CheckInOutRangeProps = {
  value?: Date;
  title: string;
  onChange?: (range: DateRange) => void;
}