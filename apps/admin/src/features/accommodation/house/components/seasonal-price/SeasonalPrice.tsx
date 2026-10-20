import { ButtonPrimary } from '@/components/shared/ButtonPrimary';
import { IconCalendar, IconPlus } from '@tabler/icons-react';
import { useState } from 'react';
import { SeasonalPriceProps, SelectedSeasonalPrice } from '../../types/seasonalPrice';
import { SeasonalPriceForm } from './SeasonalPriceForm';
import { SeasonalPriceItem } from './SeasonalPriceItem';
import { ModificationFormSection } from '@/components/shared/ModificationFormSection';

export const SeasonalPrice = (props: SeasonalPriceProps) => {
  const { error, fields, onAppend, onRemove, onUpdate, currencySymbol } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<SelectedSeasonalPrice>({
    seasonalPrice: null,
    index: undefined,
  });

  return (
    <ModificationFormSection icon={IconCalendar} title="Available Dates & Seasonal Pricing">
      <div className="space-y-6">
        {!isOpen ? (
          <ButtonPrimary
            size="sm"
            type="button"
            color="black"
            tone="outline"
            startIcon={<IconPlus />}
            onClick={() => setIsOpen(true)}
            className="h-10 w-full border-dashed border-zinc-300 text-zinc-500 hover:border-zinc-400 hover:text-zinc-900 dark:border-zinc-700 dark:text-zinc-400 dark:hover:border-zinc-500 dark:hover:text-zinc-100"
          >
            Add Seasonal Price
          </ButtonPrimary>
        ) : (
          <SeasonalPriceForm
            fields={fields}
            currentItem={currentItem}
            createHandler={onAppend}
            updateHandler={onUpdate}
            closeHandler={() => {
              setIsOpen(false);
              setCurrentItem({ seasonalPrice: null, index: undefined });
            }}
            currencySymbol={currencySymbol}
          />
        )}

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
          {fields.length === 0 ? (
            <div className="sm:col-span-2 lg:col-span-1">
              <div
                aria-invalid={!!error}
                className="w-full rounded-2xl border-2 border-dashed border-zinc-100 py-8 text-center dark:border-zinc-800 dark:bg-zinc-950/40 aria-invalid:border aria-invalid:border-red-500"
              >
                <p
                  aria-invalid={!!error}
                  className="text-sm text-muted-foreground aria-invalid:text-red-500"
                >
                  No seasonal price added yet
                </p>
              </div>
              <p className="mt-1 ml-1 h-5 text-xs text-red-500">{error}</p>
            </div>
          ) : (
            fields.map((field, index) => (
              <SeasonalPriceItem
                key={index}
                item={field}
                onRemove={() => onRemove(index)}
                onEdit={() => {
                  setIsOpen(true);
                  setCurrentItem({ seasonalPrice: field, index });
                }}
            currencySymbol={currencySymbol}
              />
            ))
          )}
        </div>
      </div>
    </ModificationFormSection>
  );
};
