import { FieldWithError } from '@/components/shared/FieldWithError';
import { FormStateToast } from '@/components/shared/FormStateToast';
import { FormSubmitButton } from '@/components/shared/ModificationForm/FormSubmitButton';
import { FormSelect } from '@/components/shared/FormSelect';
import { NumberInput } from '@/components/shared/NumberInput';
import { ModificationFormSection } from '@/components/shared/ModificationFormSection';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { getAccommodationTagsDropdown } from '@/features/accommodation-tag/server/queries';
import { AccommodationGalleryIsland } from '@/features/accommodation/components/gallery/AccommodationGalleryIsland';
import { AccommodationAmenityIsland } from '@/features/accommodation/components/amenity/AccommodationAmenityIsland';
import { AccommodationLocationIsland } from '@/features/accommodation/components/location/AccommodationLocationIslandClient';
import { AccommodationPolicyIsland } from '@/features/accommodation/components/policy/AccommodationPolicyIsland';
import type { AccommodationLocationInitial } from '@/features/accommodation/components/location/AccommodationLocationIsland';
import type { AccommodationAmenity as AccommodationAmenityType } from '@/features/accommodation/types/accommodationAmenity';
import type { AccommodationPolicy as AccommodationPolicyType } from '@/features/accommodation/types/accommodationPolicy';
import { getCurrenciesDropdown, getCurrency } from '@/features/currency/server/queries';
import type { SeasonalPrice as SeasonalPriceType } from '@/features/accommodation/house/types/seasonalPrice';
import { stringValue as str } from '@/server/form-state';
import { IconInfoCircle, IconMoneybag } from '@tabler/icons-react';
import { createHouseAction, updateHouseAction } from '../server/commands';
import type { HouseFormProps } from '../types/houseForm';
import { SeasonalPriceIsland } from './seasonal-price/SeasonalPriceIsland';

const num = (value: string | string[] | undefined, fallback?: number | string): string => {
  if (typeof value === 'string') return value;
  return fallback == null ? '' : String(fallback);
};

const parseJsonArray = <T,>(value: string | string[] | undefined): T[] | undefined => {
  if (typeof value !== 'string' || !value) return undefined;
  try {
    const parsed: unknown = JSON.parse(value);
    return Array.isArray(parsed) ? (parsed as T[]) : undefined;
  } catch {
    return undefined;
  }
};

const parseNumber = (value: string | string[] | undefined): number | null => {
  if (typeof value !== 'string' || !value.trim()) return null;
  const parsed = Number(value);
  return Number.isNaN(parsed) ? null : parsed;
};

export const HouseForm = async ({ initialData, state }: HouseFormProps) => {
  const isEditMode = Boolean(initialData?.id);
  const values = state?.values;
  const errors = state?.errors;

  const [tagOptions, currencyOptions] = await Promise.all([
    getAccommodationTagsDropdown(),
    getCurrenciesDropdown(),
  ]);

  const tagId = str(values?.tagId, initialData?.tagId ?? '');
  const currencyId = str(values?.currencyId, initialData?.house?.currencyId ?? '');
  const currencySymbol = currencyId
    ? await getCurrency(currencyId)
        .then((currency) => currency.symbol)
        .catch(() => undefined)
    : undefined;

  const initialAmenities: Array<AccommodationAmenityType> | undefined = initialData
    ? JSON.parse(JSON.stringify(initialData.amenities))
    : undefined;
  const initialPolicies: Array<AccommodationPolicyType> | undefined = initialData
    ? JSON.parse(JSON.stringify(initialData.policies))
    : undefined;
  const initialAvailableDates: Array<SeasonalPriceType> | undefined = initialData?.house
    ?.availableDates
    ? JSON.parse(JSON.stringify(initialData.house.availableDates))
    : undefined;

  const amenitiesDefaults = parseJsonArray<AccommodationAmenityType>(values?.amenitiesJson);
  const policiesDefaults = parseJsonArray<AccommodationPolicyType>(values?.policiesJson);
  const availableDatesDefaults = parseJsonArray<SeasonalPriceType>(values?.availableDatesJson);

  const locationDefaults: AccommodationLocationInitial | undefined = values
    ? {
        country: str(values.country, initialData?.country ?? ''),
        countryCode: str(values.countryCode, initialData?.countryCode ?? ''),
        city: str(values.city, initialData?.city ?? ''),
        fullAddress: str(values.fullAddress, initialData?.fullAddress ?? ''),
        latitude: parseNumber(values.latitude) ?? initialData?.latitude ?? null,
        longitude: parseNumber(values.longitude) ?? initialData?.longitude ?? null,
      }
    : undefined;

  return (
    <form
      action={isEditMode ? updateHouseAction.bind(null, initialData?.id ?? '') : createHouseAction}
    >
      <FormSubmitButton
        label={isEditMode ? 'Update House' : 'Create House'}
        className="absolute -top-18 right-0"
      />

      <FormStateToast state={state} successMessage="House updated successfully" />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <ModificationFormSection icon={IconInfoCircle} title="General Information">
            <div className="grid grid-cols-1 gap-x-6 lg:grid-cols-3">
              <FieldWithError required htmlFor="title" label="Title" error={errors?.title}>
                <Input
                  id="title"
                  name="title"
                  defaultValue={str(values?.title, initialData?.title ?? '')}
                  placeholder="Enter a title"
                  aria-invalid={Boolean(errors?.title)}
                />
              </FieldWithError>

              <FieldWithError required htmlFor="tagId" label="Tag" error={errors?.tagId}>
                <FormSelect
                  id="tagId"
                  name="tagId"
                  defaultValue={tagId}
                  placeholder="Select a tag"
                  options={tagOptions}
                  aria-invalid={Boolean(errors?.tagId)}
                />
              </FieldWithError>

              <FieldWithError
                required
                htmlFor="capacity"
                label="Capacity"
                error={errors?.capacity}
              >
                <NumberInput
                  id="capacity"
                  name="capacity"
                  step="1"
                  defaultValue={num(values?.capacity, initialData?.house?.capacity)}
                  placeholder="Enter a capacity"
                  aria-invalid={Boolean(errors?.capacity)}
                />
              </FieldWithError>

              <FieldWithError required htmlFor="area" label="Area" error={errors?.area}>
                <NumberInput
                  id="area"
                  name="area"
                  step="any"
                  defaultValue={num(values?.area, initialData?.house?.area)}
                  placeholder="Enter an area"
                  aria-invalid={Boolean(errors?.area)}
                />
              </FieldWithError>

              <FieldWithError
                required
                htmlFor="floors"
                label="Floors"
                error={errors?.floors}
              >
                <NumberInput
                  id="floors"
                  name="floors"
                  step="1"
                  defaultValue={num(values?.floors, initialData?.house?.floors)}
                  placeholder="Enter floors count"
                  aria-invalid={Boolean(errors?.floors)}
                />
              </FieldWithError>

              <FieldWithError
                required
                htmlFor="bedrooms"
                label="Bedrooms"
                error={errors?.bedrooms}
              >
                <NumberInput
                  id="bedrooms"
                  name="bedrooms"
                  step="1"
                  defaultValue={num(values?.bedrooms, initialData?.house?.bedrooms)}
                  placeholder="Enter bedrooms count"
                  aria-invalid={Boolean(errors?.bedrooms)}
                />
              </FieldWithError>

              <FieldWithError
                required
                htmlFor="bathrooms"
                label="Bathrooms"
                error={errors?.bathrooms}
              >
                <NumberInput
                  id="bathrooms"
                  name="bathrooms"
                  step="1"
                  defaultValue={num(values?.bathrooms, initialData?.house?.bathrooms)}
                  placeholder="Enter bathrooms count"
                  aria-invalid={Boolean(errors?.bathrooms)}
                />
              </FieldWithError>

              <FieldWithError
                required
                label="Description"
                htmlFor="description"
                className="lg:col-span-3"
                error={errors?.description}
              >
                <Textarea
                  id="description"
                  name="description"
                  defaultValue={str(values?.description, initialData?.description ?? '')}
                  className="resize-none"
                  placeholder="Enter a description"
                  aria-invalid={Boolean(errors?.description)}
                />
              </FieldWithError>
            </div>
          </ModificationFormSection>

          <AccommodationLocationIsland
            errors={errors}
            defaults={locationDefaults}
            initial={
              initialData
                ? {
                    country: initialData.country,
                    countryCode: initialData.countryCode,
                    city: initialData.city,
                    fullAddress: initialData.fullAddress,
                    latitude: initialData.latitude,
                    longitude: initialData.longitude,
                  }
                : undefined
            }
          />

          <ModificationFormSection icon={IconMoneybag} title="Pricing">
            <div className="grid grid-cols-1 gap-x-6 md:grid-cols-3">
              <FieldWithError required htmlFor="price" label="Price" error={errors?.price}>
                <NumberInput
                  id="price"
                  name="price"
                  step="any"
                  defaultValue={num(values?.price, initialData?.house?.price)}
                  placeholder="Enter a price"
                  aria-invalid={Boolean(errors?.price)}
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
                  defaultValue={currencyId}
                  placeholder="Select a currency"
                  options={currencyOptions}
                  aria-invalid={Boolean(errors?.currencyId)}
                />
              </FieldWithError>

              <FieldWithError
                htmlFor="discount"
                label="Discount (%)"
                error={errors?.discount}
              >
                <NumberInput
                  id="discount"
                  name="discount"
                  step="any"
                  defaultValue={num(values?.discount, initialData?.house?.discount ?? undefined)}
                  placeholder="Enter a discount"
                  aria-invalid={Boolean(errors?.discount)}
                />
              </FieldWithError>
            </div>
          </ModificationFormSection>
        </div>

        <div className="space-y-6">
          <AccommodationGalleryIsland
            errors={errors}
            accommodation={
              initialData
                ? {
                    id: initialData.id,
                    title: initialData.title,
                  }
                : undefined
            }
          />
          <AccommodationAmenityIsland
            error={errors?.amenities}
            initial={initialAmenities}
            defaults={amenitiesDefaults}
          />
          <AccommodationPolicyIsland
            error={errors?.policies}
            initial={initialPolicies}
            defaults={policiesDefaults}
          />
          <SeasonalPriceIsland
            error={errors?.availableDates}
            currencySymbol={currencySymbol}
            initial={initialAvailableDates}
            defaults={availableDatesDefaults}
          />
        </div>
      </div>
    </form>
  );
};
