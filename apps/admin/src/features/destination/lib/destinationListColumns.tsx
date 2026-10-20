import type { TableColumn } from '@/components/shared/DataTable';
import { CheckIcon, XIcon } from 'lucide-react';
import { SEASONS } from '@/features/destination/lib/seasons';
import type { Destination } from '../types/destination';
import clsx from 'clsx';

export const destinationListColumns: TableColumn<Destination>[] = [
  {
    key: 'country',
    header: 'Country',
  },
  {
    key: 'city',
    header: 'City',
  },
  {
    key: 'slogan',
    header: 'Slogan',
  },
  {
    key: 'seasons',
    header: 'Seasons',
    sortable: false,
    render: (row) => {
      const { seasons } = row;

      return (
        <ul className="flex flex-wrap items-center gap-1">
          {seasons.map((season) => {
            const selectedSeason = SEASONS.find((s) => s.value === season);

            if (!selectedSeason) return null;

            const Icon = selectedSeason.icon;

            return (
              <li
                key={selectedSeason.value}
                className={clsx(
                  'flex items-center gap-1 rounded-full border border-dashed px-3 py-2',
                  selectedSeason.className,
                )}
              >
                <Icon className="size-4" />
                <p className="text-sm">{selectedSeason.title}</p>
              </li>
            );
          })}
        </ul>
      );
    },
  },
  {
    key: 'isActive',
    header: 'Active',
    sortable: false,
    render: (row) => {
      const { isActive } = row;

      return (
        <>
          {isActive ? (
            <CheckIcon size={20} className="text-green-600 mx-auto" />
          ) : (
            <XIcon size={20} className="text-red-600 mx-auto" />
          )}
        </>
      );
    },
  },
];
