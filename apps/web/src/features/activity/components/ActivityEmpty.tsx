import { FC } from 'react';
import { ActivityEmptyProps } from '@/features/activity/types/activity';
import { IconMapPinOff } from '@tabler/icons-react';

export const ActivityEmpty: FC<ActivityEmptyProps> = ({ city }) => (
  <div className="flex flex-col items-center rounded-2xl border border-slate-200 bg-slate-50 px-6 py-16 text-center">
    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-sm">
      <IconMapPinOff className="h-8 w-8 text-slate-500" stroke={1.75} />
    </div>

    <h4 className="mt-6 text-2xl font-bold text-slate-900">No activities available in {city}</h4>

    <p className="mt-3 max-w-md text-base leading-7 text-slate-600">
      We haven't added any activities for your current location yet. We're expanding our catalog and
      hope to have experiences available here soon.
    </p>
  </div>
);
