import {
  DetailHeroImage,
  DetailMap,
  DetailPills,
  DetailView,
  detailText,
  formatDetailDate,
} from '@/components/shared/DetailView';
import { DynamicIcon } from '@/components/shared/DynamicIcon';
import { PageBreadcrumb } from '@/components/shared/PageBreadcrumb';
import { convertCountryCodeToFlag } from '@/utils/convertCountryCodeToFlag';
import { IconBuilding, IconHeart, IconHome, IconMapPin, IconBed } from '@tabler/icons-react';
import { getAccommodation } from '../server/queries';

type AccommodationDetailViewProps = {
  accommodation: Awaited<ReturnType<typeof getAccommodation>>;
};

export const AccommodationDetailView = ({ accommodation }: AccommodationDetailViewProps) => {
  const isHouse = Boolean(accommodation.house);
  const countryFlag = convertCountryCodeToFlag(accommodation.countryCode);
  const amenities = Array.isArray(accommodation.amenities) ? accommodation.amenities : [];
  const policies = Array.isArray(accommodation.policies) ? accommodation.policies : [];
  const rooms = accommodation.hotel?.rooms ?? [];
  const destinationLabel = accommodation.destination
    ? [accommodation.destination.city, accommodation.destination.country]
        .filter(Boolean)
        .join(', ')
    : null;

  return (
    <article className="mx-auto w-full">
      <PageBreadcrumb
        pages={[{ route: '/accommodations', title: 'Accommodations' }]}
        className="mb-5"
        currentPageTitle={accommodation.title}
      />
      <DetailView
        title={
          <span className="flex items-center gap-2">
            <span>{countryFlag}</span>
            <span>{accommodation.title}</span>
          </span>
        }
        backHref="/accommodations"
        backLabel="accommodations"
        editHref={`/accommodations/${accommodation.id}/edit`}
        hero={
          <DetailHeroImage
            id={accommodation.id}
            bucket="accommodations"
            title={accommodation.title}
          />
        }
        badges={
          <>
            <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-500/15 dark:text-blue-400">
              {isHouse ? <IconHome size={13} /> : <IconBuilding size={13} />}
              {isHouse ? 'House' : 'Hotel'}
            </span>
            {(accommodation.favoriteCount ?? 0) > 0 && (
              <span className="inline-flex items-center gap-1 rounded-full bg-rose-100 px-2.5 py-0.5 text-xs font-medium text-rose-800 dark:bg-rose-500/15 dark:text-rose-400">
                <IconHeart size={13} />
                {accommodation.favoriteCount} favorite{accommodation.favoriteCount === 1 ? '' : 's'}
              </span>
            )}
            {accommodation.tag && (
              <span className="inline-flex items-center gap-1 rounded-full bg-violet-100 px-2.5 py-0.5 text-xs font-medium text-violet-800 dark:bg-violet-500/15 dark:text-violet-400">
                {accommodation.tag.emoji} {accommodation.tag.title}
              </span>
            )}
            {destinationLabel && (
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-400">
                <IconMapPin size={13} />
                {destinationLabel}
              </span>
            )}
          </>
        }
        rows={[
          { label: 'Full address', value: detailText(accommodation.fullAddress) },
          { label: 'Description', value: detailText(accommodation.description) },
          {
            label: 'Amenities',
            value: (
              <DetailPills
                items={amenities
                  .map((a: { title?: string; icon?: string }) => a?.title ?? '')
                  .filter(Boolean)
                  .map((title: string, i: number) => {
                    const icon = (amenities[i] as { icon?: string })?.icon;
                    return (
                      <span key={title} className="inline-flex items-center gap-1">
                        {icon && <DynamicIcon name={icon} size={13} />}
                        {title}
                      </span>
                    );
                  })}
              />
            ),
          },
          {
            label: 'Policies',
            value: (
              <DetailPills
                items={policies
                  .map((p: { title?: string; icon?: string }) => p?.title ?? '')
                  .filter(Boolean)
                  .map((title: string, i: number) => {
                    const icon = (policies[i] as { icon?: string })?.icon;
                    return (
                      <span key={title} className="inline-flex items-center gap-1">
                        {icon && <DynamicIcon name={icon} size={13} />}
                        {title}
                      </span>
                    );
                  })}
              />
            ),
          },
          ...(isHouse && accommodation.house
            ? [
                {
                  label: 'House price',
                  value: accommodation.house.currency
                    ? `${detailText(accommodation.house.price)} ${accommodation.house.currency.symbol || accommodation.house.currency.isoCode}`
                    : detailText(accommodation.house.price),
                },
                {
                  label: 'Capacity',
                  value: detailText(accommodation.house.capacity),
                },
                {
                  label: 'Bedrooms',
                  value: detailText(accommodation.house.bedrooms),
                },
              ]
            : []),
...(!isHouse
            ? [
                ...(!isHouse && rooms.length < 1
                  ? [
                      {
                        label: 'Status',
                        value: (
                          <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800 dark:bg-red-500/15 dark:text-red-400">
                            <IconBed size={13} /> Needs rooms
                          </span>
                        ),
                      },
                    ]
                  : [])
              ]
            : []),
          ...(!isHouse && rooms.length > 0
            ? [
                {
                  label: 'Rooms',
                  value: (
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      {rooms.map((room) => (
                        <div key={room.title} className="rounded-lg border border-border bg-card p-3">
                          <h5 className="font-medium text-foreground">{room.title}</h5>
                          <div className="mt-2 flex flex-wrap gap-x-2 gap-y-1 text-sm text-muted-foreground">
                            {room.count != null && <span>{room.count} Units</span>}
                            {room.capacity != null && <span>{room.capacity} Guests</span>}
                            {room.price != null && room.currency && (
                              <span className="font-bold text-foreground">
                                {room.price} {room.currency.symbol || room.currency.isoCode}
                                {room.discount ? ` · −${room.discount}%` : ''}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ),
                },
              ]
            : []),
          {
            label: 'Location map',
            value:
              accommodation.latitude != null && accommodation.longitude != null
                ? <DetailMap latitude={accommodation.latitude} longitude={accommodation.longitude} title={accommodation.title} />
                : '—',
          },
          { label: 'Created at', value: formatDetailDate(accommodation.createdAt) },
          { label: 'Updated at', value: formatDetailDate(accommodation.updatedAt) },
        ]}
      />
    </article>
  );
};
