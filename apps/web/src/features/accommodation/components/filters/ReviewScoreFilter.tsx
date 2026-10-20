'use client';

import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Checkbox } from '@/components/ui/checkbox';
import React, { FC } from 'react';
import { ReviewScoreFilterProps } from '@/features/accommodation/types/accommodationFilters';
import { useSearchParams } from 'next/navigation';

const SCORES = [
  { value: '5', title: '5.0 Excellent' },
  { value: '4', title: '4.0+ Very good' },
  { value: '3', title: '3.0+ Good' },
];

export const ReviewScoreFilter: FC<ReviewScoreFilterProps> = ({ onToggle }) => {
  const searchParams = useSearchParams();

  const values = SCORES.map((score) => score.value);
  const selected = searchParams.get('score')?.split(',').filter(Boolean) ?? [];

  return (
    <AccordionItem value="review-score" className="flex flex-col gap-3 border-b p-4">
      <AccordionTrigger className="py-0 text-[13px] font-semibold hover:no-underline">
        Review Score
      </AccordionTrigger>
      <AccordionContent>
        <FieldGroup className="gap-1.5">
          {SCORES.map((score) => (
            <Field key={score.value} orientation="horizontal">
              <Checkbox
                id={`score-${score.value}`}
                name={`score-${score.value}`}
                checked={selected.includes(score.value)}
                onCheckedChange={() => onToggle('score', score.value, values)}
              />
              <FieldLabel htmlFor={`score-${score.value}`} className="text-[13px] font-normal">
                {score.title}
              </FieldLabel>
            </Field>
          ))}
        </FieldGroup>
      </AccordionContent>
    </AccordionItem>
  );
};
