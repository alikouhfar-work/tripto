'use client';

import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { FC } from 'react';
import { ButtonIcon } from '@/components/shared/ButtonIcon/ButtonIcon';
import { A11y, Navigation, Virtual } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { DestinationWeekendItem } from '@/features/destination/destination-weekend/components/DestinationWeekendItem';
import { DestinationWeekendSliderSkeleton } from '@/features/destination/destination-weekend/components/DestinationWeekendSliderSkeleton';
import { useGetDestinationWeekend } from '@/features/destination/destination-weekend/hooks/useGetDestinationWeekend';

export const DestinationWeekendSlider: FC = () => {
  const { data: destinations, isFetching } = useGetDestinationWeekend();

  if (isFetching) return <DestinationWeekendSliderSkeleton />;

  return (
    <div className="relative">
      <div className="absolute -top-16 right-0 hidden space-x-2 sm:block">
        <ButtonIcon
          size="small"
          variant="outline"
          color="secondary"
          className="destination-weekend-previous-slide"
        >
          <ChevronLeftIcon />
        </ButtonIcon>
        <ButtonIcon
          size="small"
          variant="outline"
          color="secondary"
          className="destination-weekend-next-slide"
        >
          <ChevronRightIcon />
        </ButtonIcon>
      </div>
      <Swiper
        navigation={{
          nextEl: '.destination-weekend-next-slide',
          prevEl: '.destination-weekend-previous-slide',
        }}
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
        {destinations?.map((destination) => (
          <SwiperSlide key={destination.accommodationId} className="p-1">
            <DestinationWeekendItem
              {...destination}
              rating={4.3}
              reviewCount={10}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
