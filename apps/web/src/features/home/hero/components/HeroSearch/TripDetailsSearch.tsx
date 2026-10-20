'use client';

import { SearchIcon } from 'lucide-react';
import { FC } from 'react';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { TripDetailsSearchFormSchema } from '../../types/tripDetailsSearch';
import { GuestList } from './GuestsList';
import { LocationList } from './LocationList';
import { useRouter } from 'next/navigation';
import { ButtonPrimary } from '@/components/shared/ButtonPrimary/ButtonPrimary';
import { CheckInOutRange } from '@/features/home/hero/components/HeroSearch/CheckInOutRange';
import { PropertyTypeSearch } from '@/features/home/hero/components/HeroSearch/PropertyTypeSearch';

export const TripDetailsSearch: FC = () => {
  const router = useRouter();
  const form = useForm<TripDetailsSearchFormSchema>({
    defaultValues: {
      range: undefined,
      location: '',
      guests: undefined,
    },
  });

  const { control, setValue, handleSubmit } = form;
  const dateRange = useWatch({
    control: control,
    name: 'range',
  });

  const onSubmit = () => {
    router.replace('/accommodations');
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <PropertyTypeSearch />
        <ul className="grid w-full grid-cols-1 gap-3 text-left shadow-none lg:grid-cols-6">
          <LocationList onChange={(location) => setValue('location', location)} />
          <CheckInOutRange
            title="Check In"
            value={dateRange?.from}
            onChange={(range) =>
              setValue('range', {
                from: range.from,
                to: dateRange.to,
              })
            }
          />
          <CheckInOutRange
            title="Check Out"
            value={dateRange?.to}
            onChange={(range) =>
              setValue('range', {
                from: dateRange.from,
                to: range.to,
              })
            }
          />
          <GuestList onChange={(guests) => setValue('guests', guests)} />
          <ButtonPrimary
            type="submit"
            size="medium"
            className="h-full rounded-2xl"
            LeftIconElement={<SearchIcon />}
          >
            Search
          </ButtonPrimary>
        </ul>
      </form>
    </FormProvider>
  );
};
