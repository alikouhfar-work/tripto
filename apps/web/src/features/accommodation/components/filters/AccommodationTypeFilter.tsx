import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import React, { FC } from 'react';
import { AccommodationTypeFilterProps } from '@/features/accommodation/types/accommodationFilters';
import { clsx } from 'clsx';
import { useSearchParams } from 'next/navigation';

const TYPES = [
  { value: 'all', title: 'Any Type' },
  { value: 'house', title: 'House' },
  { value: 'hotel', title: 'Hotel' },
];

export const AccommodationTypeFilter: FC<AccommodationTypeFilterProps> = ({ onChange }) => {
  const searchParams = useSearchParams();

  const selected = searchParams.get('type') ?? '';

  return (
    <AccordionItem value="accommodation-type" className="flex flex-col gap-3 border-b p-4">
      <AccordionTrigger className="py-0 text-[13px] font-semibold hover:no-underline">
        Type of Place
      </AccordionTrigger>
      <AccordionContent className="pb-0">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="h-auto! w-full rounded-lg border border-slate-200/50 bg-slate-50 p-1">
            {TYPES.map((type) => (
              <TabsTrigger
                value={type.value}
                onClick={() => onChange(type.value)}
                className={clsx(
                  'cursor-pointer rounded-md py-1.5 text-[10px] font-bold transition-all focus:outline-none',
                  selected === type.value
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-500 hover:text-slate-800',
                )}
              >
                {type.title}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </AccordionContent>
    </AccordionItem>
  );
};
