import { Check, Heart, MapPin, Star } from 'lucide-react';
import { motion } from 'motion/react';
import React, { FC } from 'react';
import { AccommodationListCardProps } from '@/features/accommodation/types/accommodationListCard';
import { ImagePreviewWrapper } from '@/features/document';
import Link from 'next/link';
import {IconMeterSquare} from "@tabler/icons-react";

export const AccommodationListCard: FC<AccommodationListCardProps> = ({
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
      key={accommodation.id}
      whileHover={{ y: -6 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2 }}
      initial={{ opacity: 0, x: -10 }}
      onClick={() => onSelectProperty?.(accommodation)}
    >
      <Link href={`accommodations/${accommodation.id}`} className="group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white transition-all duration-300 md:flex-row">
        <div className="relative h-50 w-full shrink-0 overflow-hidden bg-slate-50 md:h-auto md:w-70">
          <ImagePreviewWrapper
            object={object}
            id={accommodation.id}
            bucket="accommodations"
            title={accommodation.title}
            className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-110"
          />

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

          {/* Top Tag badge */}
          {accommodation.tags && accommodation.tags[0] && (
            <span className="absolute top-3 left-3 z-10 inline-flex items-center rounded-md border border-emerald-100 bg-emerald-50 px-2.5 py-1 text-[9px] font-extrabold tracking-widest text-emerald-800 uppercase shadow-xs">
              {accommodation.tags[0]}
            </span>
          )}

          {/* Carousel dots overlay */}
          <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 items-center space-x-1 opacity-75 md:hidden">
            {[0, 1, 2].map((dot) => (
              <div
                key={dot}
                className={`h-1.5 w-1.5 rounded-full ${dot === 0 ? 'w-3 bg-white' : 'bg-white/50'}`}
              />
            ))}
          </div>
        </div>

        {/* Right Side: Detailed Stay Specifications */}
        <div className="flex flex-grow flex-col justify-between gap-4 p-5">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {/* Main specifications: title, rating, sublocation */}
            <div className="space-y-2 md:col-span-2">
              {/* Title & Stars */}
              <div className="flex items-center space-x-2">
                <h3 className="font-display text-base font-bold text-slate-800 transition-colors group-hover:text-blue-600 sm:text-lg">
                  {accommodation.title}
                </h3>
                <div className="flex shrink-0 items-center text-amber-400">
                  {Array.from({ length: accommodation.stars || 4 }).map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>

              {/* Precise sublocation address, centre distance, sea access */}
              <div className="flex flex-wrap items-center gap-1.5 text-xs font-medium text-slate-500">
                <MapPin strokeWidth={2.2} className="size-3 text-blue-500" />
                <span className="font-bold text-blue-600">
                  {accommodation.city}
                </span>
                {accommodation.distanceFromCentre && (
                  <>
                    <span className="text-slate-200">•</span>
                    <span>{accommodation.distanceFromCentre} km to center</span>
                  </>
                )}
                <span className="text-slate-200">•</span>
                <span className="inline-flex items-center rounded bg-slate-100 px-1.5 py-0.5 text-[10px] text-slate-600">
                  Metro access
                </span>
                <span className="text-slate-200">•</span>
                <span className="text-slate-400">250m from beach</span>
              </div>

              {/* Suite attributes (subtype, size, beds) */}
              <div className="mt-1 text-xs text-slate-600 flex items-center gap-1">
                <span className="font-bold text-slate-700">
                  {/*{accommodation.type}*/}
                  Hotel
                </span>
                |
                <div className='flex items-center gap-1'>{accommodation.details || 'King Bed'} • <p className='flex'>{accommodation.roomSize || 30} <IconMeterSquare strokeWidth={1.6} className='size-4'/></p></div>
              </div>

              {/* Highlight attributes (free cancellation, pool etc) */}
              <ul className="flex flex-wrap gap-2 pt-2">
                {accommodation.amenities.map((amenity, index) => (
                  <li
                    key={index}
                    className="inline-flex items-center space-x-1 rounded-lg border border-indigo-100 bg-indigo-50 px-2.5 py-1 text-[10px] font-bold text-indigo-700"
                  >
                    <Check className="h-3 w-3 text-indigo-600" />
                    <span>{amenity.title}</span>
                  </li>
                ))}
              </ul>

              {!!discount && (
                <div className="mt-1 animate-pulse text-[10px] font-bold text-red-600">
                  Only 1 left at this price!
                </div>
              )}
            </div>

            {/* Ratings Summary Column on Right */}
            <div className="flex justify-between gap-2 border-t border-slate-200/80 pt-3 text-left md:flex-col md:justify-start md:border-t-0 md:pt-0 md:text-right">
              <div className="flex items-center space-x-2 md:justify-end">
                <div className="text-left">
                  <span className="block text-xs font-bold text-slate-800">
                    {accommodation.reviewsLabel || 'Excellent'}
                  </span>
                  <span className="block text-[10px] font-normal text-slate-400">
                    {accommodation.reviewsCount} reviews
                  </span>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 font-mono text-sm font-extrabold text-white shadow-sm">
                  {accommodation.rating?.toFixed(1)}
                </div>
              </div>
            </div>
          </div>

          {/* Footer Action row of row */}
          <div className="flex items-center border-t border-slate-200/80 pt-4 sm:flex-row sm:items-center justify-between">
            <div>
              <div className="flex items-center gap-1.5">
                {!!discount && (
                    <span className="rounded border border-emerald-100 bg-emerald-50 px-1.5 py-0.5 font-mono text-[10px] font-extrabold text-emerald-600">
                      {discount}
                      % OFF
                    </span>
                )}
                <div className="flex items-baseline space-x-1.5 font-mono">
                  {discount ? (
                      <>
                        <span className="text-xs font-normal text-slate-400 line-through">
                          {accommodation.currencySymbol}{formattedOriginalPrice}
                        </span>
                        <span className="text-lg font-black text-slate-900">
                          {accommodation.currencySymbol}{formattedDiscountPrice}
                        </span>
                      </>
                  ) : (
                      <span className="text-lg font-black text-slate-900">
                        {accommodation.currencySymbol}{formattedOriginalPrice}
                      </span>
                  )}
                </div>
              </div>
              <span className="mt-0.5 block text-[9px] font-normal text-slate-400">
                  5 nights, 2 adults
                </span>
            </div>

            <button
                type="button"
                onClick={() => onSelectProperty?.(accommodation)}
                className="cursor-pointer rounded-xl bg-blue-600 px-6 py-2.5 text-xs font-bold text-white shadow-md transition-all hover:bg-blue-700 hover:shadow-lg focus:outline-none active:scale-95"
            >
              Book Now
            </button>
          </div>
        </div>
      </Link>
    </motion.li>
  );
};
