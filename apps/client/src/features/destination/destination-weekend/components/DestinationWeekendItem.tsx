import { FC } from 'react';
import { DestinationWeekendItemProps } from '@/features/destination/destination-weekend/types/destinationWeekendItem';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { clsx } from 'clsx';
import { HeartIcon } from 'lucide-react';
import { ImagePreviewWrapper } from '@/features/document';
import { DestinationRatingBadge } from '@/components/shared/DestinationRatingBadge';
import { AccommodationTag } from '@/features/accommodation/accommodation-tag';

export const DestinationWeekendItem: FC<DestinationWeekendItemProps> = ({
  accommodationId,
  accommodationTitle,
  accommodationTag,
  discount,
  price,
  city,
  currencySymbol,
  country,
  rating,
  reviewCount,
  isFavourite = false,
}) => {
  const object = `${accommodationId}/hero.webp`;
  const priceAfterDiscount = discount ? price - price * discount : price;

  return (
    <Link href="/" className="flex h-full min-h-112.5 flex-col overflow-hidden rounded-2xl shadow">
      <div className="relative h-52">
        <Button
          className={clsx(
            'hover:text-error-500 absolute top-2 right-2 z-20 h-8 w-8 cursor-pointer rounded-full bg-white text-zinc-700 hover:bg-white',
            isFavourite && 'text-error-500',
          )}
          onClick={(event) => {
            alert('Implement Like Logic');
            event.preventDefault();
            event.stopPropagation();
          }}
        >
          {isFavourite ? <HeartIcon fill="#ff3b3b" /> : <HeartIcon />}
        </Button>
        <ImagePreviewWrapper
          object={object}
          id={accommodationId}
          bucket="accommodations"
          title={`${country}, ${city}`}
          className="absolute h-full object-cover"
        />
        <div className="absolute top-0 left-0 z-10 h-full w-full bg-linear-to-b from-transparent from-0% via-zinc-900/0 to-zinc-900/80 to-100%" />
      </div>
      <ul className="flex flex-1 flex-col justify-between gap-2 bg-white p-6">
        <li>
          {reviewCount && (
            <DestinationRatingBadge rating={rating} reviewCount={reviewCount} side="right" />
          )}
          <p className="mt-4 text-xl leading-5 font-bold">{accommodationTitle}</p>
          <p className="mt-4 text-sm font-semibold">
            {city}, {country}
          </p>
          <AccommodationTag {...accommodationTag} />
        </li>
        <li className="text-right text-sm text-zinc-300">
          per night
          <span
            className={clsx(
              discount
                ? 'mx-1 font-semibold line-through'
                : 'ml-1 text-lg font-bold text-zinc-700',
            )}
          >
            {currencySymbol}
            {price}
          </span>
          {!!discount && priceAfterDiscount && (
            <span className="text-lg font-bold text-zinc-700">
              {currencySymbol}
              {priceAfterDiscount}
            </span>
          )}
        </li>
      </ul>
    </Link>
  );
};
