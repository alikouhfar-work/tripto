import { DataTableImageCell } from '@/components/shared/DataTable';
import type { TableColumn } from '@/components/shared/DataTable';
import { DynamicIcon } from '@/components/shared/DynamicIcon';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { convertCountryCodeToFlag } from '@/utils/convertCountryCodeToFlag';
import { IconBuilding, IconHome } from '@tabler/icons-react';
import { AccommodationTag } from '@/features/accommodation-tag/components/AccommodationTag';
import { AccommodationColumns } from '../types/accommodation';

export const accommodationListColumns: TableColumn<AccommodationColumns>[] = [
  {
    key: 'image',
    header: 'Image',
    sortable: false,
    render: (row) => <DataTableImageCell id={row.id} title={row.title} bucket="accommodations" />,
  },
  {
    key: 'type',
    header: 'Type',
    render: (row) => {
      if (row.type === 'HOUSE') {
        return (
          <div className="flex items-center gap-1">
            <IconHome size={16} />
            <p>House</p>
          </div>
        );
      }
      if (row.type === 'HOTEL') {
        return (
          <div className="flex items-center gap-1">
            <IconBuilding size={16} />
            <p>Hotel</p>
          </div>
        );
      }
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
    key: 'tag',
    header: 'Tag',
    sortable: false,
    render: (row) => {
      const { tag } = row;

      return <AccommodationTag {...tag} title={tag.title} emoji={tag.emoji} />;
    },
  },
  {
    key: 'amenities',
    header: 'Amenities',
    sortable: false,
    render: (row) => {
      const { amenities } = row;
      const displayedAmenities = amenities.slice(0, 2);
      const hasMore = amenities.length > 2;

      return (
        <ul className="flex flex-wrap items-center gap-1">
          {displayedAmenities.map((amenity) => (
            <li
              key={amenity.title}
              className="flex items-center gap-1 rounded-full border border-dashed border-indigo-600 bg-indigo-50/50 px-3 py-2 text-indigo-600 dark:border-indigo-500 dark:bg-indigo-500/10 dark:text-indigo-400"
            >
              <DynamicIcon name={amenity.icon} size={16} />
              <p className="text-sm">{amenity.title}</p>
            </li>
          ))}
          {hasMore && (
            <li className="flex items-center gap-1 rounded-full bg-indigo-500 px-3 py-2 text-white">
              <p className="text-sm">+{amenities.length - 2} more</p>
            </li>
          )}
        </ul>
      );
    },
  },
  {
    key: 'policies',
    header: 'Policies',
    sortable: false,
    render: (row) => {
      const { policies } = row;
      const displayedPolicies = policies.slice(0, 2);
      const hasMore = policies.length > 2;

      return (
        <ul className="flex flex-wrap items-center gap-1">
          {displayedPolicies.map((policy) => (
            <HoverCard openDelay={0} closeDelay={0} key={policy.title}>
              <HoverCardTrigger asChild>
                <li className="flex cursor-default items-center gap-1 rounded-full border border-dashed border-zinc-600 bg-zinc-50/50 px-3 py-2 text-zinc-600 dark:border-zinc-500 dark:bg-zinc-500/10 dark:text-zinc-300">
                  <DynamicIcon name={policy.icon} size={16} />
                  <p className="text-sm">{policy.title}</p>
                </li>
              </HoverCardTrigger>
              <HoverCardContent side="top">
                <div className="space-y-1">
                  <p className="font-semibold">{policy.title}</p>
                  <p className="text-xs text-zinc-600">{policy.description}</p>
                </div>
              </HoverCardContent>
            </HoverCard>
          ))}
          {hasMore && (
            <li className="flex items-center gap-1 rounded-full bg-zinc-500 px-3 py-2 text-white">
              <p className="text-sm">+{policies.length - 2} more</p>
            </li>
          )}
        </ul>
      );
    },
  },
];
