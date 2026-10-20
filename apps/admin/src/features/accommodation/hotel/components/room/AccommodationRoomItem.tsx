'use client';

import {
  IconBath,
  IconBed,
  IconHome,
  IconMeterSquare,
  IconPencil,
  IconRuler,
  IconTrash,
  IconUsers,
} from '@tabler/icons-react';
import { useMemo } from 'react';
import Link from 'next/link';
import { RoomItemProps } from '../../types/room';
import { SafeImage } from '@/components/shared/SafeImage';
import { RoomDeleteDialog } from '@/features/accommodation/hotel/room/components/RoomDeleteDialog';
import { useGetDocuments } from '@repo/documents/client';

export const AccommodationRoomItem = (props: RoomItemProps) => {
  const { item, accommodationId, onRemove, onEdit, isLastRoom = false } = props;
  const { data } = useGetDocuments({
    bucket: 'accommodations',
    id: item.id as string,
    category: 'roomGallery',
    prefix: `${accommodationId}/rooms/${item.id}/gallery`,
  });

  const previews = useMemo<string[]>(() => {
    if (data?.urls) return data.urls;
    else if (item.galleryImages?.length)
      return item.galleryImages.map((file) => URL.createObjectURL(file));
    else return [];
  }, [data?.urls, item.galleryImages]);

  const formatPrice = (amount: number, curr: string) => {
    try {
      if (amount === undefined || amount === null || isNaN(amount)) return '—';
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: curr || 'USD',
        maximumFractionDigits: 2,
      }).format(amount);
    } catch (e) {
      return `${curr || ''} ${amount || 0}`;
    }
  };

  const price = item.price || 0;
  const discount = item.discount || 0;
  const discountedPrice = discount > 0 ? price * (1 - discount / 100) : price;

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card">
      <div className="absolute top-3 right-3 z-10 flex items-center gap-2">
        {onEdit ? (
          <button
            type="button"
            onClick={onEdit}
            className="rounded-full bg-black/30 p-1 text-white backdrop-blur-md transition-colors hover:bg-black/50 hover:text-white"
            title="Edit"
            aria-label={`Edit ${item.title || 'room'}`}
          >
            <IconPencil size={14} />
          </button>
        ) : (
          accommodationId &&
          item.id && (
            <Link
              href={`/accommodations/${accommodationId}/rooms/${item.id}/edit`}
              className="rounded-full bg-black/30 p-1 text-white backdrop-blur-md transition-colors hover:bg-black/50 hover:text-white"
              title="Edit"
              aria-label={`Edit ${item.title || 'room'}`}
            >
              <IconPencil size={14} />
            </Link>
          )
        )}
        {onRemove ? (
          <button
            type="button"
            onClick={onRemove}
            className="rounded-full bg-black/30 p-1 text-white backdrop-blur-md transition-colors hover:bg-red-500/80 hover:text-white"
            title="Delete"
            aria-label={`Delete ${item.title || 'room'}`}
          >
            <IconTrash size={14} />
          </button>
        ) : (
          accommodationId &&
          item.id && (
            <RoomDeleteDialog
              accommodationId={accommodationId}
              roomId={item.id}
              roomTitle={item.title}
              isLastRoom={isLastRoom}
            />
          )
        )}
      </div>
      <div className="relative h-48 w-full shrink-0 overflow-hidden rounded-tl-lg rounded-tr-lg">
        <SafeImage
          fill
          alt={item.title}
          src={previews[0]}
          placeholderPatternSize={80}
          placeholderPatternOpacity={0.4}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {previews.length > 1 && (
          <div className="absolute right-2 bottom-2 rounded-md border border-white/20 bg-black/50 px-1.5 py-0.5 text-[8px] font-bold text-white uppercase backdrop-blur-md">
            +{previews.length - 1} photos
          </div>
        )}
        {discount > 0 && (
          <div className="absolute top-3 left-3 rounded-full border border-white/20 bg-black/50 px-2 py-1 text-[10px] font-bold text-white backdrop-blur-md">
            {discount}% Discount
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2 p-4">
        <h4 className="truncate text-lg leading-tight font-bold text-foreground sm:text-xl">
          {item.title || 'Untitled AccommodationRoom Type'}
        </h4>

        <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-2">
          <div className="flex items-center gap-2 rounded-lg border border-indigo-200 bg-indigo-50 px-2 py-1 dark:border-indigo-500/30 dark:bg-indigo-500/10">
            <IconHome size={14} className="text-indigo-500 dark:text-indigo-400" />
            <span className="text-[10px] leading-none font-bold text-indigo-700 sm:text-[11px] dark:text-indigo-300">
              {item.count} Units
            </span>
          </div>

          <div className="flex items-center gap-2 rounded-lg border border-indigo-200 bg-indigo-50 px-2 py-1 dark:border-indigo-500/30 dark:bg-indigo-500/10">
            <IconUsers size={14} className="text-indigo-500 dark:text-indigo-400" />
            <span className="text-[10px] leading-none font-bold text-indigo-700 sm:text-[11px] dark:text-indigo-300">
              {item.capacity} Guests
            </span>
          </div>

          <div className="flex items-center gap-2 rounded-lg border border-indigo-200 bg-indigo-50 px-2 py-1 dark:border-indigo-500/30 dark:bg-indigo-500/10">
            <IconBath size={14} className="text-indigo-500 dark:text-indigo-400" />
            <span className="text-[10px] leading-none font-bold text-indigo-700 sm:text-[11px] dark:text-indigo-300">
              {item.bathrooms} Bathrooms
            </span>
          </div>

          <div className="flex items-center gap-2 rounded-lg border border-indigo-200 bg-indigo-50 px-2 py-1 dark:border-indigo-500/30 dark:bg-indigo-500/10">
            <IconRuler size={14} className="text-indigo-500 dark:text-indigo-400" />
            <span className="flex items-center text-[10px] leading-none font-bold text-indigo-700 sm:text-[11px] dark:text-indigo-300">
              {item.area} <IconMeterSquare size={14} />
            </span>
          </div>

          {(() => {
            if (!item.beds) return null;
            const labels = { king: 'King', queen: 'Queen', double: 'Double', single: 'Single' };
            const activeBeds = Object.entries(item.beds)
              .filter(([_, count]) => (count as number) > 0)
              .map(([name, count]) => `${count} ${labels[name as keyof typeof labels]}`);

            if (activeBeds.length === 0) return null;

            return (
              <div className="flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-2 py-1 dark:border-amber-500/30 dark:bg-amber-500/10">
                <IconBed size={14} className="text-amber-500 dark:text-amber-400" />
                <span className="text-[10px] leading-none font-bold text-amber-700 sm:text-[11px] dark:text-amber-300">
                  {activeBeds.join(' • ')}
                </span>
              </div>
            );
          })()}
        </div>

        <div className="mt-4 flex justify-end border-t border-border/60 pt-3">
          <div className="text-right">
            {discount > 0 && item.currency && (
              <div className="text-[10px] font-bold text-muted-foreground line-through">
                {formatPrice(price, item.currency?.isoCode)}
              </div>
            )}
            <div className="flex items-baseline gap-1">
              <span className="text-sm leading-none font-extrabold text-foreground sm:text-base">
                {item.currency && formatPrice(discountedPrice, item.currency?.isoCode)}
              </span>
              <span className="text-[10px] text-nowrap text-muted-foreground">/ night</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
