'use client';

import { Checkbox as CheckboxPrimitive } from 'radix-ui';
import { FieldWithError } from '@/components/shared/FieldWithError';
import { ModificationFormSection } from '@/components/shared/ModificationFormSection';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { IconCalendarEvent, IconInfoCircle } from '@tabler/icons-react';
import { motion } from 'motion/react';
import { useRouter } from 'next/navigation';
import { type FC, useEffect, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { DestinationFormProps } from '@/features/destination/types/destination';
import { useCreateDestination } from '@/features/destination/hooks/useCreateDestination';
import { useUpdateDestination } from '@/features/destination/hooks/useUpdateDestination';
import { destinationSchema, DestinationSchema } from '@/features/destination/schema';
import { SEASONS } from '@/features/destination/lib/seasons';
import clsx from 'clsx';
import { ModificationFormHeader } from '@/components/shared/ModificationForm';

export const DestinationForm: FC<DestinationFormProps> = ({ initialData }) => {
  const router = useRouter();
  const isEditMode = Boolean(initialData?.id);
  const createDestinationMutation = useCreateDestination();
  const updateDestinationMutation = useUpdateDestination();
  const isSubmitting = updateDestinationMutation.isPending || createDestinationMutation.isPending;

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<DestinationSchema>({
    mode: 'onChange',
    resolver: zodResolver(destinationSchema),
    defaultValues: {
      city: '',
      slogan: '',
      country: '',
      isActive: true,
      seasons: undefined,
    },
  });

  const submitButtonLabel = useMemo(() => {
    if (isSubmitting) {
      return isEditMode ? 'Updating...' : 'Creating...';
    }

    return isEditMode ? 'Update Destination' : 'Create Destination';
  }, [isEditMode, isSubmitting]);

  const onSubmit = async (formData: DestinationSchema) => {
    initialData?.id
      ? updateDestinationMutation.mutateAsync({ id: initialData.id, data: formData })
      : createDestinationMutation.mutateAsync(formData).then(() => router.push('/destinations'));
  };

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ModificationFormHeader
        title={{
          edit: `Edit ${initialData?.country}, ${initialData?.city}`,
          create: 'Create Destination',
        }}
        description={{
          edit: 'Update destination details and availability.',
          create: 'Create a new destination and configure its details.',
        }}
        isEditMode={isEditMode}
        isSubmitting={isSubmitting}
        submitButtonLabel={submitButtonLabel}
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <ModificationFormSection
            icon={IconInfoCircle}
            title="General Information"
            headerExtraElements={
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-zinc-500">Is Active</span>
                <Controller
                  name="isActive"
                  control={control}
                  render={({ field }) => (
                    <button
                      type="button"
                      onClick={() => field.onChange(!field.value)}
                      className={`relative h-6 w-12 rounded-full transition-colors ${field.value ? 'bg-blue-600' : 'bg-zinc-200'}`}
                    >
                      <motion.div
                        animate={{ x: field.value ? 24 : 0 }}
                        className="absolute top-1 left-1 h-4 w-4 rounded-full bg-white shadow-sm"
                      />
                    </button>
                  )}
                />
              </div>
            }
          >
            <div className="grid grid-cols-1 gap-x-6 md:grid-cols-2">
              <FieldWithError
                required
                htmlFor="country"
                label="Country"
                error={errors.country?.message}
              >
                <Controller
                  name="country"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Input
                      id="country"
                      {...field}
                      placeholder="Enter a country"
                      aria-invalid={!!fieldState.error}
                    />
                  )}
                />
              </FieldWithError>

              <FieldWithError required htmlFor="city" label="City" error={errors.city?.message}>
                <Controller
                  name="city"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Input
                      id="city"
                      {...field}
                      placeholder="Enter a city"
                      aria-invalid={!!fieldState.error}
                    />
                  )}
                />
              </FieldWithError>

              <FieldWithError
                required
                htmlFor="slogan"
                label="Slogan"
                error={errors.slogan?.message}
                className="md:col-span-2"
              >
                <Controller
                  name="slogan"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Input
                      id="slogan"
                      {...field}
                      placeholder="Enter a slogan"
                      aria-invalid={!!fieldState.error}
                    />
                  )}
                />
              </FieldWithError>
            </div>
          </ModificationFormSection>
        </div>

        <ModificationFormSection icon={IconCalendarEvent} title="Seasonal Highlight">
          <FieldWithError required label="Season" htmlFor="season" error={errors.seasons?.message}>
            <Controller
              name="seasons"
              control={control}
              render={({ field, fieldState }) => {
                const value: string[] = field.value ?? [];

                const toggle = (seasonValue: string) => {
                  const next = value.includes(seasonValue)
                    ? value.filter((v) => v !== seasonValue)
                    : [...value, seasonValue];

                  field.onChange(next);
                };

                return (
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-4 lg:grid-cols-1 xl:grid-cols-2">
                    {SEASONS.map((season) => {
                      const Icon = season.icon;
                      const checked = value.includes(season.value);

                      return (
                        <CheckboxPrimitive.Root
                          key={season.value}
                          checked={checked}
                          aria-invalid={!!fieldState.error}
                          onCheckedChange={() => toggle(season.value)}
                          className={clsx(
                            'bg-zinc-50/70 dark:bg-zinc-950/70',
                            'relative rounded-lg border px-3 py-5 transition-all',
                            'aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40',
                            checked
                              ? 'border-blue-500 ring-[3px] ring-blue-500/40'
                              : 'border-zinc-200 dark:border-zinc-700',
                          )}
                        >
                          <div className="flex cursor-pointer flex-col items-center gap-3 text-center after:absolute after:inset-0">
                            <Icon className="size-7 text-blue-600" />
                            <p className="text-base font-semibold">{season.title}</p>
                            <span className="text-sm text-zinc-400">{season.description}</span>
                          </div>
                        </CheckboxPrimitive.Root>
                      );
                    })}
                  </div>
                );
              }}
            />
          </FieldWithError>
        </ModificationFormSection>
      </div>
    </form>
  );
};
