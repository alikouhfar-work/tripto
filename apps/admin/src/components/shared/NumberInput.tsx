'use client';

import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { IconMinus, IconPlus } from '@tabler/icons-react';
import { useState, type ChangeEvent } from 'react';

type NumberInputProps = {
  id?: string;
  name: string;
  defaultValue?: string | number;
  /** Controlled mode (e.g. map-synced latitude/longitude). Omit for uncontrolled. */
  value?: string | number;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  min?: number;
  max?: number;
  step?: number | string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  'aria-invalid'?: boolean | 'true' | 'false';
  className?: string;
};

/**
 * shadcn-styled number input with stepper buttons and hidden native spinners.
 * Uncontrolled by default (submits via the surrounding form); pass `value` +
 * `onChange` for controlled usage (e.g. inputs synced with a map picker).
 */
export const NumberInput = ({
  id,
  name,
  defaultValue,
  value: controlledValue,
  onChange,
  min,
  max,
  step,
  placeholder,
  disabled,
  required,
  'aria-invalid': ariaInvalid,
  className,
}: NumberInputProps) => {
  const [innerValue, setInnerValue] = useState<string>(String(defaultValue ?? ''));
  const isControlled = controlledValue !== undefined;
  const displayValue = isControlled ? String(controlledValue ?? '') : innerValue;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) setInnerValue(event.target.value);
    onChange?.(event);
  };

  const nudge = (direction: 1 | -1) => {
    const stepSize = typeof step === 'number' && !Number.isNaN(step) ? step : 1;
    const current = displayValue === '' ? 0 : Number(displayValue);
    const base = Number.isNaN(current) ? 0 : current;
    // Avoid float drift (0.1 + 0.2) by rounding to the step precision.
    const precision = String(stepSize).split('.')[1]?.length ?? 0;
    let next = Number((base + direction * stepSize).toFixed(Math.min(precision + 2, 10)));
    if (min !== undefined) next = Math.max(min, next);
    if (max !== undefined) next = Math.min(max, next);
    const nextString = String(next);
    if (!isControlled) setInnerValue(nextString);
    // Synthesize the event shape parents expect (event.target.value).
    onChange?.({ target: { value: nextString } } as ChangeEvent<HTMLInputElement>);
  };

  const stepperClassName =
    'flex h-11.5 w-11 shrink-0 items-center justify-center rounded-lg border border-zinc-200 bg-zinc-50/50 text-muted-foreground transition-colors outline-none hover:bg-zinc-100 hover:text-foreground focus-visible:border-blue-500 focus-visible:ring-[3px] focus-visible:ring-blue-500/40 disabled:pointer-events-none disabled:opacity-50 dark:border-zinc-700 dark:bg-zinc-950/70 dark:hover:bg-zinc-800';

  return (
    <div className="flex items-stretch gap-2">
      <button
        type="button"
        aria-label="Decrease value"
        disabled={disabled}
        onClick={() => nudge(-1)}
        className={stepperClassName}
      >
        <IconMinus size={16} />
      </button>
      <Input
        id={id}
        name={name}
        type="number"
        value={displayValue}
        onChange={handleChange}
        min={min}
        max={max}
        step={step}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        aria-invalid={ariaInvalid}
        className={cn(
          'text-center [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none',
          className,
        )}
      />
      <button
        type="button"
        aria-label="Increase value"
        disabled={disabled}
        onClick={() => nudge(1)}
        className={stepperClassName}
      >
        <IconPlus size={16} />
      </button>
    </div>
  );
};
