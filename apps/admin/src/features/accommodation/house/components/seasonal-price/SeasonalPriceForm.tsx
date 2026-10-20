import { ButtonPrimary } from '@/components/shared/ButtonPrimary';
import { FieldWithError } from '@/components/shared/FieldWithError';
import { NumberInput } from '@/components/shared/NumberInput';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { SeasonalPriceFormProps } from '../../types/seasonalPrice';

export const SeasonalPriceForm = (props: SeasonalPriceFormProps) => {
  const { fields, currentItem, closeHandler, createHandler, updateHandler } = props;
  const [dateISO, setDateISO] = useState(
    currentItem.seasonalPrice?.date ?? new Date().toISOString(),
  );
  const [price, setPrice] = useState(currentItem.seasonalPrice?.price?.toString() ?? '');
  const [errors, setErrors] = useState<{ date?: string; price?: string }>({});

  useEffect(() => {
    setDateISO(currentItem.seasonalPrice?.date ?? new Date().toISOString());
    setPrice(currentItem.seasonalPrice?.price?.toString() ?? '');
    setErrors({});
  }, [currentItem.seasonalPrice, currentItem.index]);

  const validate = () => {
    const next: { date?: string; price?: string } = {};
    if (!dateISO) next.date = 'Date is required';
    if (!price.trim()) next.price = 'Price is required';
    else if (Number.isNaN(Number(price)) || Number(price) <= 0)
      next.price = 'Price must be a positive number';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onReset = () => {
    setDateISO(new Date().toISOString());
    setPrice('');
    setErrors({});
  };

  const onClose = () => {
    onReset();
    closeHandler();
  };

  const onModify = () => {
    if (!validate()) return;
    const dateExists = fields.some(
      (field) => new Date(field.date).getDate() === new Date(dateISO).getDate(),
    );

    if (currentItem.index === undefined && dateExists) {
      toast.error('A price is already defined for this date');
    } else {
      const numericPrice = Number(price);
      onClose();
      if (currentItem.index !== undefined) {
        updateHandler(currentItem.index, { date: dateISO, price: numericPrice });
      } else {
        createHandler({ date: dateISO, price: numericPrice });
      }
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-top-2 relative grid grid-cols-1 gap-x-4 rounded-2xl border border-zinc-200/60 bg-zinc-50/50 p-5 shadow-none duration-200 dark:border-zinc-800 dark:bg-zinc-950/60 dark:shadow-inner sm:grid-cols-2 lg:grid-cols-1">
      <FieldWithError required htmlFor="date" label="Date" error={errors.date}>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant="outline"
              className="h-11.5 w-full justify-start rounded-lg border-zinc-200 pl-2 font-normal shadow-none hover:bg-white dark:border-zinc-700 dark:bg-zinc-950 dark:hover:bg-zinc-900"
            >
              {dateISO ? format(dateISO, 'PPP') : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={new Date(dateISO)}
              onSelect={(date) => date && setDateISO(date.toISOString())}
            />
          </PopoverContent>
        </Popover>
      </FieldWithError>

      <FieldWithError required htmlFor="price" label="Price" error={errors.price}>
        <NumberInput
          id="price"
          name="price"
          step="0.1"
          value={price}
          placeholder="Enter a price"
          onChange={(event) => setPrice(event.target.value)}
          aria-invalid={!!errors.price}
        />
      </FieldWithError>

      <div className="flex items-center gap-2">
        <ButtonPrimary type="button" color="red" tone="outline" onClick={onClose}>
          Close
        </ButtonPrimary>
        <ButtonPrimary type="button" color="black" onClick={onModify}>
          {currentItem.index !== undefined ? 'Update' : 'Add'}
        </ButtonPrimary>
      </div>
    </div>
  );
};
