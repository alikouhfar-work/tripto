'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

export type FormSelectOption = { value: string; label: string };

type FormSelectProps = {
  id?: string;
  name: string;
  defaultValue?: string;
  placeholder?: string;
  options: FormSelectOption[];
  disabled?: boolean;
  required?: boolean;
  'aria-invalid'?: boolean | 'true' | 'false';
  className?: string;
};

/**
 * shadcn (Radix) select for server-rendered forms.
 * Renders a hidden native select under the hood, so the chosen value
 * is submitted with the surrounding form (same `name` contract as before).
 */
export const FormSelect = ({
  id,
  name,
  defaultValue,
  placeholder,
  options,
  disabled,
  required,
  'aria-invalid': ariaInvalid,
  className,
}: FormSelectProps) => {
  return (
    <Select name={name} defaultValue={defaultValue} disabled={disabled} required={required}>
      <SelectTrigger id={id} aria-invalid={ariaInvalid} className={cn('w-full', className)}>
        <SelectValue placeholder={placeholder ?? 'Select an option'} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
