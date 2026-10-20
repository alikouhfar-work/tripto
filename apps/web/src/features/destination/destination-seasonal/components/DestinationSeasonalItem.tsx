import { FC } from 'react';
import { DestinationSeasonalItemProps } from '@/features/destination/destination-seasonal/types/destinationSeasonalItem';
import { ImagePreviewWrapper } from '@/features/document';
import { motion } from 'motion/react';
import Link from 'next/link';

export const DestinationSeasonalItem: FC<DestinationSeasonalItemProps> = ({
  index,
  destination,
}) => {
  const object = `${destination.accommodationId}/hero.webp`;

  return (
    <motion.li
      animate={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 15 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="group relative h-120 cursor-pointer overflow-hidden rounded-2xl border border-slate-100 shadow-xs transition-all duration-300 hover:shadow-xl"
    >
      <Link href={`destinations/${destination.accommodationId}`}>
        <ImagePreviewWrapper
          object={object}
          bucket="accommodations"
          id={destination.accommodationId}
          title={`${destination.country}, ${destination.city}`}
          className="absolute h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-slate-950/95 via-slate-950/30 to-transparent" />

        <div className="absolute right-5 bottom-5 left-5 space-y-2 text-white">
          <h3 className="font-display text-lg leading-tight font-bold transition-colors group-hover:text-amber-200 sm:text-xl">
            {destination.country}, {destination.city}
          </h3>
          <p className="line-clamp-2 text-xs leading-relaxed font-light text-slate-200/90">
            {destination.destinationSlogan}
          </p>
          <div className="mt-2 flex items-center justify-between border-t border-white/10 pt-2.5">
            <span className="text-[10px] font-medium text-slate-400">Starting from</span>
            <span className="space-x-1 font-mono text-sm font-black text-amber-300">
              <span>${destination.price}</span>
              <span className="font-sans text-[10px] font-normal text-slate-300">/ night</span>
            </span>
          </div>
        </div>
      </Link>
    </motion.li>
  );
};
