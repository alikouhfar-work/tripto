import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Checkbox } from '@/components/ui/checkbox';
import React, { FC } from 'react';
import { useSearchParams } from 'next/navigation';
import { AreaFilterProps } from '@/features/accommodation/types/accommodationFilters';

const AREAS = [
  { value: '0', title: 'Small (≤ 25 m²)' },
  { value: '25', title: 'Medium (26–40 m²)' },
  { value: '40', title: 'Large (≥ 41 m²)' },
];

export const AreaFilter: FC<AreaFilterProps> = ({ onToggle }) => {
  const searchParams = useSearchParams();

  const values = AREAS.map((area) => area.value);
  const selected = searchParams.get('area')?.split(',').filter(Boolean) ?? [];

  return (
    <AccordionItem value="area" className="flex flex-col gap-3 border-b p-4">
      <AccordionTrigger className="py-0 text-[13px] font-semibold hover:no-underline">
        Area
      </AccordionTrigger>
      <AccordionContent>
        <FieldGroup className="gap-1.5">
          {AREAS.map((area) => (
            <Field key={area.value} orientation="horizontal">
              <Checkbox
                id={`area-${area.value}`}
                name={`area-${area.value}`}
                checked={selected.includes(area.value)}
                onCheckedChange={() => onToggle('area', area.value, values)}
              />
              <FieldLabel htmlFor={`area-${area.value}`} className="text-[13px] font-normal">
                {area.title}
              </FieldLabel>
            </Field>
          ))}
        </FieldGroup>
      </AccordionContent>
    </AccordionItem>
  );
};
