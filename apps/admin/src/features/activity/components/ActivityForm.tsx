import { FieldWithError } from '@/components/shared/FieldWithError';
import { FormStateToast } from '@/components/shared/FormStateToast';
import { FormSelect } from '@/components/shared/FormSelect';
import { NumberInput } from '@/components/shared/NumberInput';
import { ModificationFormSection } from '@/components/shared/ModificationFormSection';
import { ModificationFormHeader } from '@/components/shared/ModificationForm';
import { Input } from '@/components/ui/input';
import { getActivityTypesDropdown } from '@/features/activity-type/server/queries';
import { getCurrenciesDropdown } from '@/features/currency/server/queries';
import { stringValue as str } from '@/server/form-state';
import { IconInfoCircle, IconMapPin, IconMoneybag, IconTicket } from '@tabler/icons-react';
import { createActivityAction, updateActivityAction } from '../server/commands';
import type { ActivityFormProps } from '../types/activity';
import { ActivityImageUploader } from './ActivityImageUploader';

export const ActivityForm = async ({ initialData, state }: ActivityFormProps) => {
  const isEditMode = Boolean(initialData?.id);
  const values = state?.values;
  const errors = state?.errors;

  const [activityTypeOptions, currencyOptions] = await Promise.all([
    getActivityTypesDropdown(false),
    getCurrenciesDropdown(false),
  ]);

  const object = `${initialData?.id}/hero.webp`;

  return (
    <form
      action={isEditMode ? updateActivityAction.bind(null, initialData?.id ?? '') : createActivityAction}
    >
      <ModificationFormHeader
        title={{
          create: 'Create Activity',
          edit: `Edit ${initialData?.title}`,
        }}
        description={{
          edit: 'Update activity details and availability.',
          create: 'Create a new activity and configure its details.',
        }}
        isEditMode={isEditMode}
        submitButtonLabel={isEditMode ? 'Update Activity' : 'Create Activity'}
      />

      <FormStateToast state={state} successMessage="Activity updated successfully" />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <ModificationFormSection icon={IconInfoCircle} title="General Information">
            <div className="grid grid-cols-1 gap-x-6 md:grid-cols-2">
              <FieldWithError required htmlFor="title" label="Title" error={errors?.title}>
                <Input
                  id="title"
                  name="title"
                  defaultValue={str(values?.title, initialData?.title ?? '')}
                  placeholder="Enter a title"
                  aria-invalid={Boolean(errors?.title)}
                />
              </FieldWithError>

              <FieldWithError
                required
                htmlFor="activityTypeId"
                label="Activity Type"
                error={errors?.activityTypeId}
              >
                <FormSelect
                  id="activityTypeId"
                  name="activityTypeId"
                  defaultValue={str(values?.activityTypeId, initialData?.activityTypeId ?? '')}
                  placeholder="Select an activity type"
                  options={activityTypeOptions}
                  aria-invalid={Boolean(errors?.activityTypeId)}
                />
              </FieldWithError>
            </div>

            <FieldWithError htmlFor="heroImage" label="Hero Image" error={errors?.heroImage}>
              <ActivityImageUploader
                name="heroImage"
                bucket="activities"
                object={object}
                recordId={initialData?.id}
                title={initialData?.title}
              />
            </FieldWithError>
          </ModificationFormSection>

          <ModificationFormSection icon={IconMapPin} title="Location Details">
            <div className="grid grid-cols-1 gap-x-6 md:grid-cols-2">
              <FieldWithError required htmlFor="country" label="Country" error={errors?.country}>
                <Input
                  id="country"
                  name="country"
                  defaultValue={str(values?.country, initialData?.country ?? '')}
                  placeholder="Enter a country"
                  aria-invalid={Boolean(errors?.country)}
                />
              </FieldWithError>

              <FieldWithError
                required
                htmlFor="countryCode"
                label="Country Code"
                error={errors?.countryCode}
              >
                <Input
                  id="countryCode"
                  name="countryCode"
                  defaultValue={str(values?.countryCode, initialData?.countryCode ?? '')}
                  placeholder="Enter a country code"
                  aria-invalid={Boolean(errors?.countryCode)}
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
                htmlFor="fullAddress"
                label="Full Address"
                error={errors?.fullAddress}
              >
                <Input
                  id="fullAddress"
                  name="fullAddress"
                  defaultValue={str(values?.fullAddress, initialData?.fullAddress ?? '')}
                  placeholder="Enter full address"
                  aria-invalid={Boolean(errors?.fullAddress)}
                />
              </FieldWithError>
            </div>
          </ModificationFormSection>
        </div>

        <div className="space-y-6">
          <ModificationFormSection icon={IconMoneybag} title="Pricing">
            <FieldWithError required htmlFor="price" label="Price" error={errors?.price}>
              <NumberInput
                id="price"
                name="price"
                min={0}
                step={0.1}
                defaultValue={str(
                  values?.price,
                  initialData?.price != null ? String(initialData.price) : '',
                )}
                placeholder="Enter a price"
                aria-invalid={Boolean(errors?.price)}
              />
            </FieldWithError>

            <FieldWithError htmlFor="discount" label="Discount (%)" error={errors?.discount}>
              <NumberInput
                id="discount"
                name="discount"
                min={0}
                step={0.1}
                defaultValue={str(
                  values?.discount,
                  initialData?.discount != null ? String(initialData.discount) : '',
                )}
                placeholder="Enter a discount"
                aria-invalid={Boolean(errors?.discount)}
              />
            </FieldWithError>

            <FieldWithError
              required
              htmlFor="currencyId"
              label="Currency"
              error={errors?.currencyId}
            >
              <FormSelect
                id="currencyId"
                name="currencyId"
                defaultValue={str(values?.currencyId, initialData?.currencyId ?? '')}
                placeholder="Select a currency"
                options={currencyOptions}
                aria-invalid={Boolean(errors?.currencyId)}
              />
            </FieldWithError>
          </ModificationFormSection>

          <div className="relative overflow-hidden rounded-3xl bg-blue-600 p-6 text-white">
            <div className="relative z-10">
              <h3 className="mb-2 text-lg font-bold">Need Help?</h3>
              <p className="mb-4 text-sm text-blue-100">
                Check our documentation for advanced activity management.
              </p>
              <button
                type="button"
                className="w-full rounded-xl bg-white py-2 text-sm font-bold text-blue-600 transition-colors hover:bg-blue-50"
              >
                View Guide
              </button>
            </div>

            <div className="absolute -right-4 -bottom-4 rotate-12 transform opacity-20">
              <IconTicket size={120} />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
