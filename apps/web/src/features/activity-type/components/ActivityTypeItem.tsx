import { FC } from 'react';
import { ActivityTypeItemProps } from '@/features/activity-type/types/activityTypeItem';
import { getTablerIcon } from '@/utils/getTablerIcon';
import { Icon } from '@tabler/icons-react';

export const ActivityTypeItem: FC<ActivityTypeItemProps> = ({
  id,
  icon,
  title,
  selectedActivityTypeId,
  onActivityTypeChange,
}) => {
  const isActive = id === selectedActivityTypeId;
  const Icon = getTablerIcon(icon) as Icon;

  return (
    <li
      key={id}
      onClick={() => onActivityTypeChange(id)}
      className={`flex shrink-0 cursor-pointer items-center space-x-2 rounded-lg px-4 py-2.5 text-xs font-bold transition-all focus:outline-none sm:text-sm ${
        isActive
          ? 'bg-blue-600 text-white shadow-md'
          : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800'
      }`}
    >
      <Icon className="size-4 sm:size-5" />
      <span>{title}</span>
    </li>
  );
};
