import React from 'react';
import { ArrowRight, Star } from 'lucide-react';
import { motion } from 'motion/react';
import { ImagePreviewWrapper } from '@/features/document';

export interface Accommodation {
  id: string;
  title: string;
  type: 'Hotel' | 'House' | 'Guest House' | 'Cabins' | 'Glamping' | 'Doms';
  city: string;
  country: string;
  rating: number;
  reviewsCount: number;
  price: number;
  discount?: number;
  image: string;
  description: string;
  amenities: string[];
  tags: string[];
  isDeal?: boolean;
  featured?: boolean;
}

interface AccommodationCardProps {
  key?: string;
  property: Accommodation;
}

export const AccommodationCard = ({ property }: AccommodationCardProps) => {
  const {
    id,
    title,
    type,
    city,
    country,
    rating,
    reviewsCount,
    discount,
    price,
    image,
    isDeal,
    tags,
  } = property;
  const object = `${id}/hero.webp`;

  const getRatingLabel = (score: number) => {
    if (score >= 4.9) return 'Exceptional';
    if (score >= 4.7) return 'Wonderful';
    if (score >= 4.5) return 'Very Good';
    return 'Good';
  };

  const priceAfterDiscount = discount ? price - price * discount : price;

  return (
    <motion.li
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs transition-all duration-300"
    >
      <div className="relative aspect-[4/3] shrink-0 overflow-hidden bg-slate-100">
        <ImagePreviewWrapper
          id={id}
          object={object}
          bucket="accommodations"
          title={`${country}, ${city}`}
          className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />

        <button
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="absolute top-4 right-4 z-10 cursor-pointer rounded-full bg-slate-950/20 p-1.5 text-white backdrop-blur-sm transition-all duration-300 hover:bg-slate-950/40 focus:outline-none"
        >
          {/*<Heart*/}
          {/*  className={`h-4 w-4 transition-colors ${*/}
          {/*    isSaved*/}
          {/*      ? 'animate-heartBeat fill-rose-500 text-rose-500'*/}
          {/*      : 'text-white/90 hover:text-rose-400'*/}
          {/*  }`}*/}
          {/*/>*/}
        </button>

        {/* Promo badges */}
        <div className="absolute top-4 left-4 z-10 flex flex-col items-start gap-2">
          {discount && (
            <span className="rounded-full bg-red-500 px-2.5 py-1 text-[10px] font-bold tracking-wider text-white uppercase shadow-sm">
              Getaway Deal
            </span>
          )}
          <span className="rounded-full bg-blue-600/90 px-2.5 py-1 text-[10px] font-bold tracking-wider text-white uppercase shadow-sm backdrop-blur-sm">
            {type}
          </span>
        </div>

        <div className="absolute bottom-3 left-4 z-10 flex max-w-[85%] flex-wrap gap-1.5">
          {tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-black/40 px-2 py-0.5 text-[9px] font-medium text-white backdrop-blur-sm"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-grow flex-col justify-between p-5">
        <div className="cursor-pointer space-y-2">
          {/* Rating Badge */}
          <div className="flex items-center space-x-1.5">
            <div className="flex items-center rounded-lg bg-blue-50 px-2 py-0.5 font-mono text-xs font-bold text-blue-700">
              <Star className="mr-1 h-3 w-3 fill-amber-400 text-amber-400" />
              <span>{rating.toFixed(1)}</span>
            </div>
            <span className="text-xs font-semibold text-slate-700">{getRatingLabel(rating)}</span>
            <span className="text-[10px] text-slate-400">({reviewsCount} reviews)</span>
          </div>

          {/* Title */}
          <h3 className="font-display text-xl leading-5 font-bold text-slate-800 transition-colors group-hover:text-blue-600">
            {title}
          </h3>

          {/* Location */}
          <p className="text-xs font-medium text-slate-500">
            {city}, {country}
          </p>
        </div>

        {/* Price & Action button */}
        <div className="mt-5 flex items-center justify-between border-t border-slate-200/80 pt-4">
          <div>
            <span className="block text-[10px] font-medium tracking-wider text-slate-400 uppercase">
              Per Night
            </span>
            <div className="flex items-baseline space-x-1.5">
              {discount ? (
                <>
                  <span className="font-mono text-lg font-extrabold text-blue-600">
                    ${priceAfterDiscount}
                  </span>
                  <span className="font-mono text-sm text-slate-400 line-through">${price}</span>
                </>
              ) : (
                <span className="font-mono text-lg font-extrabold text-slate-800">${price}</span>
              )}
            </div>
          </div>

          <button className="flex cursor-pointer items-center space-x-1 rounded-xl bg-slate-50 px-3.5 py-2.5 text-xs font-bold text-blue-600 shadow-sm transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white focus:outline-none">
            <span>Details</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </motion.li>
  );
};
