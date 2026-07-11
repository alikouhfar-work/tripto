import Link from 'next/link';
import { FC } from 'react';
import { DestinationSeasonalItemProps } from '@/features/destination/destination-seasonal/types/destinationSeasonalItem';
import { ImagePreviewWrapper } from '@/features/document';

export const DestinationSeasonalItem: FC<DestinationSeasonalItemProps> = ({ destination }) => {
  const object = `${destination.accommodationId}/hero.webp`;

  return (
    <li className="relative aspect-video overflow-hidden rounded-2xl shadow lg:aspect-auto lg:h-130">
      <Link href={`destinations/${destination.accommodationId}`}>
        <ImagePreviewWrapper
          object={object}
          bucket="accommodations"
          id={destination.accommodationId}
          title={`${destination.country}, ${destination.city}`}
          className="absolute h-full object-cover"
        />

        <div className="absolute top-0 left-0 z-10 h-full w-full bg-linear-to-b from-transparent from-0% via-zinc-900/20 to-zinc-900 to-100%" />
        <div className="absolute bottom-0 left-0 z-20 px-4 py-6 text-white">
          <h4 className="text-base leading-3 font-bold">{destination.city}</h4>
          <h3 className="text-4xl leading-8 font-extrabold">{destination.country}</h3>
          <p className="text-sm font-semibold mt-5">
            From
            <span className="text-warning-500 ml-0.5 text-xl font-bold">
              {destination.currencySymbol}
              {destination.price}
            </span>
            <span className="text-warning-500 font-bold">/Night</span>
          </p>
          <span className="text-sm">{destination.destinationSlogan}</span>
        </div>
      </Link>
    </li>
  );
};
