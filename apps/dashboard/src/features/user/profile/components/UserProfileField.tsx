import { FC } from 'react';
import { UserProfileFieldProps } from '../types/profile';

export const UserProfileField: FC<UserProfileFieldProps> = (props) => {
  const { label, value, icon: Icon } = props;

  return (
    <div className="flex flex-col gap-1">
      <p className="mb-2 ml-1 flex gap-1 text-xs font-semibold tracking-wider text-zinc-500 uppercase">
        {label}
      </p>
      <div className="group flex h-11.5 items-center gap-3 rounded-lg border border-zinc-100 bg-zinc-50 px-4 py-3 transition-colors hover:border-blue-200">
        <Icon className="size-5 text-zinc-400 transition-colors group-hover:text-blue-500" />
        <span className="text-sm font-medium text-zinc-700">{value}</span>
      </div>
    </div>
  );
};
