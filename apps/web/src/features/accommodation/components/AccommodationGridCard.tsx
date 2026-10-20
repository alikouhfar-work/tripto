import React, {FC} from 'react';
import {motion} from 'motion/react';
import {ChevronRight, Heart, MapPin, Star} from 'lucide-react';
import {AccommodationGridCardProps} from '@/features/accommodation/types/accommodationGridCard';
import {ImagePreviewWrapper} from '@/features/document';
import Link from 'next/link';

export const AccommodationGridCard: FC<AccommodationGridCardProps> = ({
  accommodation,
  isSaved = false,
  onSelectProperty,
  onToggleSaveProperty,
}) => {
  const object = `${accommodation.id}/hero.webp`;
  const discount = accommodation.discount || 0;
  const originalPrice = accommodation.price || 0;
  const discountedPrice = discount > 0 ? originalPrice * (1 - discount / 100) : originalPrice;
  const formattedOriginalPrice = new Intl.NumberFormat('de-DE').format(originalPrice)
  const formattedDiscountPrice = new Intl.NumberFormat('de-DE').format(discountedPrice)

  return (
    <motion.li
      whileHover={{ y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      initial={{ opacity: 0, y: 15 }}
      onClick={() => onSelectProperty?.(accommodation)}
    >
      <Link href={`accommodations/${accommodation.id}`} className="group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white transition-all duration-300">
        <div className="relative h-68 xl:h-auto xl:aspect-4/3 shrink-0 overflow-hidden bg-slate-50">
          <ImagePreviewWrapper
            object={object}
            id={accommodation.id}
            bucket="accommodations"
            title={accommodation.title}
            className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-110"
          />

          {/* Heart Icon Toggle */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleSaveProperty?.(accommodation.id);
            }}
            className="absolute top-3 right-3 z-10 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white/90 text-slate-600 shadow-md backdrop-blur-sm transition-all hover:bg-white hover:text-rose-500 focus:outline-none active:scale-90"
          >
            <Heart
              className={`h-4 w-4 ${isSaved ? 'fill-rose-500 text-rose-500' : 'text-slate-400'}`}
            />
          </button>

          {/* Badge tag */}
          {accommodation.tags && accommodation.tags[0] && (
            <span className="absolute top-3 left-3 z-10 inline-flex items-center rounded-md border border-emerald-100 bg-emerald-50 px-2.5 py-1 text-[9px] font-extrabold tracking-widest text-emerald-800 uppercase shadow-xs">
              {accommodation.tags[0]}
            </span>
          )}

          {/* Image dots overlay */}
          <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 items-center space-x-1 opacity-70">
            {[0, 1, 2].map((dot) => (
              <div
                key={dot}
                className={`h-1.5 w-1.5 rounded-full ${dot === 0 ? 'w-3 bg-white' : 'bg-white/50'}`}
              />
            ))}
          </div>
        </div>

        {/* Property Details Content */}
        <div className="flex flex-grow flex-col justify-between space-y-3 p-4">
          <div className="space-y-1.5">
            {/* Title & Stars */}
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-display text-sm leading-tight font-bold text-slate-800 transition-colors group-hover:text-blue-600">
                {accommodation.title}
              </h3>
              <div className="flex shrink-0 items-center space-x-0.5 text-amber-400">
                <span className="mr-0.5 font-mono text-xs font-bold text-slate-800">
                  {accommodation.stars || 4}
                </span>
                <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
              </div>
            </div>

            {/* Location link and distance */}
            <div className="flex items-center gap-1 text-xs font-medium text-slate-400">
              <MapPin className="size-3 text-blue-500" />
              <span className="text-blue-600">
                {accommodation.city}
              </span>
            </div>

            {/* Review and details row */}
            <div className="flex items-center space-x-1.5 rounded-lg border border-slate-200/80 bg-slate-50 p-1.5 text-[11px] font-medium text-slate-500">
              <span className="rounded-sm bg-blue-100 px-1 py-0.5 font-mono text-[10px] font-bold text-blue-700">
                {accommodation.rating?.toFixed(1)}
              </span>
              <span className="font-bold text-slate-700">
                {accommodation.reviewsLabel || 'Very Good'}
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-[10px] font-normal">{accommodation.reviewsCount} reviews</span>
            </div>

            {/* Subtype and Bed description */}
            <ul className="text-[11px] flex items-center flex-wrap gap-1 py-2 font-medium text-slate-500">
              {accommodation.amenities.map((amenity, index) => (
                  <li key={index} className="flex items-center gap-1">
                    <p>{amenity.title}</p>
                    {index !== accommodation.amenities.length - 1 && <span>•</span>}
                  </li>
              ))}
            </ul>
          </div>

          {/* Price Tag Footer row */}
          <div className="flex items-end justify-between border-t border-slate-200/80 pt-3">
            <div className="space-y-0.5">
              {!!discount && (
                <span className="inline-flex items-center rounded bg-emerald-50 px-1.5 py-0.5 font-mono text-[10px] font-bold text-emerald-600">
                  {discount}
                  % off
                </span>
              )}
              <div className="flex items-baseline space-x-1 font-mono">
                {!!discount ? (
                  <>
                    <span className="text-xs font-normal text-slate-400 line-through">
                      {accommodation.currencySymbol}{formattedOriginalPrice}
                    </span>
                    <span className="text-sm font-extrabold text-slate-900">
                      {accommodation.currencySymbol}{formattedDiscountPrice}
                    </span>
                  </>
                ) : (
                  <span className="text-sm font-extrabold text-slate-900">
                    {accommodation.currencySymbol}{formattedOriginalPrice}
                  </span>
                )}
              </div>
              {/*<span className="block text-[9px] font-normal text-slate-400">*/}
              {/*  5 nights, 2 adults*/}
              {/*</span>*/}
            </div>

            {/* Little Details Label trigger */}
            <span className="flex items-center gap-0.5 text-[10px] font-extrabold tracking-wide text-blue-600 uppercase group-hover:underline">
              <span>Book Now</span>
              <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </span>
          </div>
        </div>
      </Link>
    </motion.li>
  );
};
