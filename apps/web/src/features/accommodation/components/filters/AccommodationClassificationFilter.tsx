'use client';

import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Rating } from '@/components/ui/rating';
import { useSearchParams } from 'next/navigation';
import { FC } from 'react';
import { AccommodationClassificationFilterProps } from '@/features/accommodation/types/accommodationFilters';

const CLASSIFICATIONS = ['5', '4', '3'];

export const AccommodationClassificationFilter: FC<AccommodationClassificationFilterProps> = ({
  onToggle,
}) => {
  const searchParams = useSearchParams();

  const selected = searchParams.get('classification')?.split(',').filter(Boolean) ?? [];

  return (
    <AccordionItem
      value="accommodation-classification"
      className="flex flex-col gap-3 border-b p-4"
    >
      <AccordionTrigger className="py-0 text-[13px] font-semibold hover:no-underline">
        Accommodation Classification
      </AccordionTrigger>

      <AccordionContent>
        <FieldGroup className="gap-2">
          {CLASSIFICATIONS.map((value) => (
            <Field key={value} orientation="horizontal">
              <Checkbox
                id={`classification-${value}`}
                name={`classification-${value}`}
                checked={selected.includes(value)}
                onCheckedChange={() => onToggle('classification', value, CLASSIFICATIONS)}
              />

              <FieldLabel htmlFor={`classification-${value}`} className="text-[13px] font-normal">
                <div className="flex items-center">
                  <Rating
                    readOnly
                    size={16}
                    value={Number(value)}
                    className="[&_[data-filled='false']_svg]:fill-transparent [&_[data-filled='false']_svg]:stroke-slate-300 [&_[data-filled='false']_svg]:stroke-[1.5px] [&_[data-filled='false']_svg]:text-amber-400 [&_[data-filled='true']_svg]:text-amber-400"
                  />
                  <span className="ml-1.5 text-[10px] font-normal text-slate-400">
                    ({value}-star)
                  </span>
                </div>
              </FieldLabel>
            </Field>
          ))}
        </FieldGroup>
      </AccordionContent>
    </AccordionItem>
  );
};
