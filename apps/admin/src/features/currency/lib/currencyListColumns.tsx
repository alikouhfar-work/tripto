import type { TableColumn } from '@/components/shared/DataTable';
import { CheckIcon, XIcon } from 'lucide-react';
import { Currency } from '../types/currency';

export const currencyListColumns: TableColumn<Currency>[] = [
  {
    key: 'title',
    header: 'Title',
  },
  {
    key: 'isoCode',
    header: 'ISO Code',
  },
  {
    key: 'symbol',
    header: 'Symbol',
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
            <CheckIcon size={20} className="text-green-600 mx-auto" />
          ) : (
            <XIcon size={20} className="text-red-600 mx-auto" />
          )}
        </>
      );
    },
  },
];
