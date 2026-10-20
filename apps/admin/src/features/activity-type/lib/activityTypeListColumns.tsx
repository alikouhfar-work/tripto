import type { TableColumn } from '@/components/shared/DataTable';
import { getTablerIcon } from '@/utils/getTablerIcon';
import { Icon } from '@tabler/icons-react';
import { CheckIcon, XIcon } from 'lucide-react';
import { ActivityType } from '../types/activityType';

export const activityTypeListColumns: TableColumn<ActivityType>[] = [
  {
    key: 'title',
    header: 'Title',
  },
  {
    key: 'name',
    header: 'Name',
  },
  {
    key: 'icon',
    header: 'Icon',
    sortable: false,
    render: (row) => {
      const { icon } = row;
      const Icon = getTablerIcon(icon) as Icon;
      if (!Icon) return;
      return <Icon strokeWidth={1.6} className="mx-auto text-zinc-700 dark:text-zinc-300" />;
    },
  },
  {
    key: 'emoji',
    header: 'Emoji',
    sortable: false,
    render: (row) => {
      const { emoji } = row;

      return <p className="text-center text-lg">{emoji}</p>;
    },
  },
  {
    key: 'isActive',
    header: 'Active',
    sortable: false,
    render: (row) => {
      const isActive = row.isActive;

      return (
        <>
          {isActive ? (
            <CheckIcon size={20} className="mx-auto text-green-600" />
          ) : (
            <XIcon size={20} className="mx-auto text-red-600" />
          )}
        </>
      );
    },
  },
];
