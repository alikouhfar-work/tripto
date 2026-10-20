import { FieldWithError } from '@/components/shared/FieldWithError';
import { FormStateToast } from '@/components/shared/FormStateToast';
import { FormSubmitButton } from '@/components/shared/ModificationForm/FormSubmitButton';
import { FormSelect } from '@/components/shared/FormSelect';
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
import { stringValue as str } from '@/server/form-state';
import { IconInfoCircle } from '@tabler/icons-react';
import { createHotelAction, updateHotelAction } from '../server/commands';
import type { HotelFormProps } from '../types/hotelForm';

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

export const HotelForm = async ({ initialData, state }: HotelFormProps) => {
  const isEditMode = Boolean(initialData?.id);
  const values = state?.values;
  const errors = state?.errors;

  const tagOptions = await getAccommodationTagsDropdown();
  const tagId = str(values?.tagId, initialData?.tagId ?? '');

  const initialAmenities: Array<AccommodationAmenityType> | undefined = initialData
    ? JSON.parse(JSON.stringify(initialData.amenities))
    : undefined;
  const initialPolicies: Array<AccommodationPolicyType> | undefined = initialData
    ? JSON.parse(JSON.stringify(initialData.policies))
    : undefined;

  const amenitiesDefaults = parseJsonArray<AccommodationAmenityType>(values?.amenitiesJson);
  const policiesDefaults = parseJsonArray<AccommodationPolicyType>(values?.policiesJson);

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
      action={isEditMode ? updateHotelAction.bind(null, initialData?.id ?? '') : createHotelAction}
    >
      <FormSubmitButton
        label={isEditMode ? 'Update Hotel' : 'Create Hotel'}
        className="absolute -top-18 right-0"
      />

      <FormStateToast state={state} successMessage="Hotel updated successfully" />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <ModificationFormSection icon={IconInfoCircle} title="General Information">
            <div className="grid grid-cols-1 gap-x-6 lg:grid-cols-2">
              <FieldWithError required htmlFor="title" label="Title" error={errors?.title}>
                <Input
                  id="title"
                  name="title"
                  defaultValue={str(values?.title, initialData?.title ?? '')}
                  placeholder="Enter a title"
                  aria-label="Hotel Title"
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
                label="Description"
                htmlFor="description"
                className="lg:col-span-2"
                error={errors?.description}
              >
                <Textarea
                  id="description"
                  name="description"
                  defaultValue={str(values?.description, initialData?.description ?? '')}
                  className="resize-none"
                  aria-label="Hotel Description"
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
        </div>
      </div>
    </form>
  );
};
