import { FieldWithError } from '@/components/shared/FieldWithError';
import { FormStateToast } from '@/components/shared/FormStateToast';
import { ModificationFormSection } from '@/components/shared/ModificationFormSection';
import { ModificationFormHeader } from '@/components/shared/ModificationForm';
import { Input } from '@/components/ui/input';
import { stringValue as str } from '@/server/form-state';
import { IconCalendarEvent, IconInfoCircle } from '@tabler/icons-react';
import { createDestinationAction, updateDestinationAction } from '../server/commands';
import type { DestinationFormProps } from '../types/destination';
import { SEASONS } from '../lib/seasons';
import { SeasonEnum } from '@repo/enums';
import clsx from 'clsx';

export const DestinationForm = ({ initialData, state }: DestinationFormProps) => {
  const isEditMode = Boolean(initialData?.id);
  const values = state?.values;
  const errors = state?.errors;

  const seasonValues: string[] = values?.seasons
    ? Array.isArray(values.seasons)
      ? values.seasons
      : [values.seasons]
    : ((initialData?.seasons ?? []) as string[]);

  return (
    <form
      action={isEditMode ? updateDestinationAction.bind(null, initialData?.id ?? '') : createDestinationAction}
    >
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
        submitButtonLabel={isEditMode ? 'Update Destination' : 'Create Destination'}
      />

      <FormStateToast state={state} successMessage="Destination updated successfully" />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <ModificationFormSection icon={IconInfoCircle} title="General Information">
            <div className="grid grid-cols-1 gap-x-6 md:grid-cols-2">
              <FieldWithError
                required
                htmlFor="country"
                label="Country"
                error={errors?.country}
              >
                <Input
                  id="country"
                  name="country"
                  defaultValue={str(values?.country, initialData?.country ?? '')}
                  placeholder="Enter a country"
                  aria-invalid={Boolean(errors?.country)}
                />
              </FieldWithError>

              <FieldWithError required htmlFor="city" label="City" error={errors?.city}>
                <Input
                  id="city"
                  name="city"
                  defaultValue={str(values?.city, initialData?.city ?? '')}
                  placeholder="Enter a city"
                  aria-invalid={Boolean(errors?.city)}
                />
              </FieldWithError>

              <FieldWithError
                required
                htmlFor="slogan"
                label="Slogan"
                error={errors?.slogan}
                className="md:col-span-2"
              >
                <Input
                  id="slogan"
                  name="slogan"
                  defaultValue={str(values?.slogan, initialData?.slogan ?? '')}
                  placeholder="Enter a slogan"
                  aria-invalid={Boolean(errors?.slogan)}
                />
              </FieldWithError>
            </div>
          </ModificationFormSection>
        </div>

        <ModificationFormSection icon={IconCalendarEvent} title="Seasonal Highlight">
          <FieldWithError required label="Season" htmlFor="seasons" error={errors?.seasons}>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-4 lg:grid-cols-1 xl:grid-cols-2">
              {SEASONS.map((season) => {
                const Icon = season.icon;
                const defaultChecked = seasonValues.includes(
                  season.value as SeasonEnum,
                );

                return (
                  <label
                    key={season.value}
                    className={clsx(
                      'bg-zinc-50/70 dark:bg-zinc-950/70',
                      'relative cursor-pointer rounded-lg border px-3 py-5 transition-all',
                      'has-checked:border-blue-500 has-checked:ring-[3px] has-checked:ring-blue-500/40',
                      'has-focus-visible:border-blue-500 has-focus-visible:ring-[3px] has-focus-visible:ring-blue-500/40',
                      'border-zinc-200 dark:border-zinc-700',
                    )}
                  >
                    <div className="flex flex-col items-center gap-3 text-center">
                      <input
                        type="checkbox"
                        name="seasons"
                        value={season.value}
                        defaultChecked={defaultChecked}
                        aria-invalid={Boolean(errors?.seasons)}
                        className="sr-only"
                      />
                      <Icon className="size-7 text-blue-600 dark:text-blue-400" />
                      <p className="text-base font-semibold">{season.title}</p>
                      <span className="text-sm text-zinc-400">{season.description}</span>
                    </div>
                  </label>
                );
              })}
            </div>
          </FieldWithError>
        </ModificationFormSection>
      </div>
    </form>
  );
};
