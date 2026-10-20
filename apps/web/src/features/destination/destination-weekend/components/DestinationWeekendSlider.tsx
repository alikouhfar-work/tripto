'use client';

import { FC } from 'react';
import { A11y, Navigation, Virtual } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { DestinationWeekendSliderSkeleton } from '@/features/destination/destination-weekend/components/DestinationWeekendSliderSkeleton';
import { useGetDestinationWeekend } from '@/features/destination/destination-weekend/hooks/useGetDestinationWeekend';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import { AccommodationCard } from '@/features/accommodation/components/AccommodationCard';

export const DestinationWeekendSlider: FC = () => {
  const { data: destinations, isFetching } = useGetDestinationWeekend();

  if (isFetching) return <DestinationWeekendSliderSkeleton />;

  return (
    <div className="relative">
      <div className="absolute -top-18 right-0 flex shrink-0 items-center space-x-2">
        <button
          type="button"
          className="destination-weekend-previous-slide ursor-pointer flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition-all hover:bg-slate-50 hover:text-slate-950 focus:outline-none active:scale-95 disabled:cursor-not-allowed disabled:border-slate-100 disabled:bg-slate-50/70 disabled:text-slate-300 disabled:opacity-50"
          aria-label="Previous Deal"
        >
          <IconChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          className="destination-weekend-next-slide flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition-all hover:bg-slate-50 hover:text-slate-950 focus:outline-none active:scale-95 disabled:cursor-not-allowed disabled:border-slate-100 disabled:bg-slate-50/70 disabled:text-slate-300 disabled:opacity-50"
          aria-label="Next Deal"
        >
          <IconChevronRight className="h-5 w-5" />
        </button>
      </div>
      <Swiper
        navigation={{
          nextEl: '.destination-weekend-next-slide',
          prevEl: '.destination-weekend-previous-slide',
        }}
        className="p-1!"
        spaceBetween={10}
        slidesPerView={1}
        virtual={{
          enabled: true,
          addSlidesAfter: 0,
          addSlidesBefore: 0,
          slides: destinations,
        }}
        modules={[Navigation, Virtual, A11y]}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 4,
          },
        }}
      >
        {destinations?.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 py-12 text-center text-xs font-medium text-slate-400">
            No matching special weekend deals match your category choice.
          </div>
        ) : (
          destinations?.map((destination) => (
            <SwiperSlide key={destination.accommodationId} className="h-auto!">
              <AccommodationCard
                property={{
                  id: destination.accommodationId,
                  rating: 2,
                  type: 'Hotel',
                  discount: 0.5,
                  reviewsCount: 5,
                  city: destination.city,
                  price: destination.price,
                  country: destination.country,
                  title: destination.accommodationTitle,
                  tags: ['Test'],
                }}
              />
            </SwiperSlide>
          ))
        )}
      </Swiper>
    </div>
  );
};
