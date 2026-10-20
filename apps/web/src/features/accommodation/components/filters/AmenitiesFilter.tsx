import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import React from 'react';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Checkbox } from '@/components/ui/checkbox';

export const AmenitiesFilter = () => {
  return (
    <AccordionItem value="amenities" className="flex flex-col gap-3 border-b p-4">
      <AccordionTrigger className="py-0 text-[13px] font-semibold hover:no-underline">
        Amenities
      </AccordionTrigger>
      <AccordionContent>
        <FieldGroup className="flex flex-wrap gap-1 pb-0">
          <Field
            orientation="horizontal"
            className="w-fit rounded-sm border border-slate-400 text-slate-600 has-data-[state=checked]:border-indigo-600 has-data-[state=checked]:bg-indigo-50 has-data-[state=checked]:text-indigo-700"
          >
            <Checkbox id="test" name="test" className="hidden" />
            <FieldLabel htmlFor="test" className="cursor-pointer p-2 px-3 text-[13px] font-normal">
              Free Wifi
            </FieldLabel>
          </Field>
        </FieldGroup>
      </AccordionContent>
    </AccordionItem>
  );
};
