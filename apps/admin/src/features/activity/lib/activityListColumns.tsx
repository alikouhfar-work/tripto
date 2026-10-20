import { DataTableImageCell } from '@/components/shared/DataTable';
import type { TableColumn } from '@/components/shared/DataTable';
import { convertCountryCodeToFlag } from '@/utils/convertCountryCodeToFlag';
import { CheckIcon, XIcon } from 'lucide-react';
import { ActivityColumnDTO } from '../types/activity';

export const activityListColumns: TableColumn<ActivityColumnDTO>[] = [
  {
    key: 'image',
    header: 'Image',
    sortable: false,
    render: (row) => {
      const { id, title } = row;
      const placeholderPatternUrl = '/icons/patterns/image-placeholer/activity.svg';

      return (
        <DataTableImageCell
          id={id}
          title={title}
          bucket="activities"
          placeholderPatternUrl={placeholderPatternUrl}
        />
      );
    },
  },
  {
    key: 'title',
    header: 'Title',
  },
  {
    key: 'country',
    header: 'Country',
    render: (row) => {
      const { country, countryCode } = row;
      const countryFlag = convertCountryCodeToFlag(countryCode);

      return (
        <p className="flex items-center gap-1">
          <span className="mt-0.5">{countryFlag}</span>
          <span>{country}</span>
        </p>
      );
    },
  },
  {
    key: 'city',
    header: 'City',
  },
  {
    key: 'price',
    header: 'Price',
    render: (row) => {
      const { price, currency } = row;

      return (
        <p className="flex items-center gap-0.5">
          <span>{currency.symbol}</span>
          <span>{price}</span>
        </p>
      );
    },
  },
  {
    key: 'discount',
    header: 'Discount',
    render: (row) => {
      const { discount } = row;

      if (!discount) return;

      return (
        <p>
          <span>{discount}</span>
          <span>%</span>
        </p>
      );
    },
  },
  {
    key: 'activityType.title',
    header: 'Activity Type',
    render: (row) => {
      const { activityType } = row;

      return (
        <p className="flex items-center gap-1">
          <span>{activityType.emoji}</span>
          <span>{activityType.title}</span>
        </p>
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
