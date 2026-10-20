'use client';

import { ButtonPrimary } from '@/components/shared/ButtonPrimary';
import { IconPlus, IconSparkles } from '@tabler/icons-react';
import { ModificationFormSection } from '@/components/shared/ModificationFormSection';
import { useState } from 'react';
import {
  AccommodationAmenityProps,
  SelectedAccommodationAmenity,
} from '@/features/accommodation/types/accommodationAmenity';
import { AccommodationAmenityForm } from '@/features/accommodation/components/amenity/AccommodationAmenityForm';
import { AccommodationAmenityItem } from '@/features/accommodation/components/amenity/AccommodationAmenityItem';

export const AccommodationAmenity = (props: AccommodationAmenityProps) => {
  const { error, fields, onAppend, onRemove, onUpdate } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<SelectedAccommodationAmenity>({
    amenity: null,
    index: undefined,
  });

  return (
    <ModificationFormSection icon={IconSparkles} title="Amenities">
      <div className="space-y-6">
        {!isOpen ? (
          <ButtonPrimary
            size="sm"
            type="button"
            color="black"
            tone="outline"
            startIcon={<IconPlus />}
            onClick={() => setIsOpen(true)}
            className="h-10 w-full border-dashed border-border text-muted-foreground hover:border-muted-foreground/50 hover:text-foreground"
          >
            Add Amenity
          </ButtonPrimary>
        ) : (
          <AccommodationAmenityForm
            currentItem={currentItem}
            createHandler={onAppend}
            updateHandler={onUpdate}
            closeHandler={() => {
              setIsOpen(false);
              setCurrentItem({ amenity: null, index: undefined });
            }}
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
                  No amenity added yet
                </p>
              </div>
              <p className="mt-1 ml-1 h-5 text-xs text-red-500">{error}</p>
            </div>
          ) : (
            fields.map((field, index) => (
              <AccommodationAmenityItem
                key={index}
                item={field}
                onRemove={() => onRemove(index)}
                onEdit={() => {
                  setIsOpen(true);
                  setCurrentItem({ amenity: field, index });
                }}
              />
            ))
          )}
        </div>
      </div>
    </ModificationFormSection>
  );
};
