import { FieldWithError } from '@/components/shared/FieldWithError';
import { FormStateToast } from '@/components/shared/FormStateToast';
import { FormSelect } from '@/components/shared/FormSelect';
import { ModificationFormSection } from '@/components/shared/ModificationFormSection';
import { ModificationFormHeader } from '@/components/shared/ModificationForm';
import { NumberInput } from '@/components/shared/NumberInput';
import { Input } from '@/components/ui/input';
import { AccommodationAmenityIsland } from '@/features/accommodation/components/amenity/AccommodationAmenityIsland';
import { RoomGalleryIsland } from '@/features/accommodation/hotel/room/components/RoomGalleryIsland';
import type { AccommodationAmenity as AccommodationAmenityType } from '@/features/accommodation/types/accommodationAmenity';
import type { FormState } from '@/server/form-state';
import { stringValue as str } from '@/server/form-state';
import {
  IconBed,
  IconInfoCircle,
  IconMoneybag,
  IconRuler,
} from '@tabler/icons-react';
import { createRoomAction, updateRoomAction } from '@/features/accommodation/hotel/room/server/commands';
import type { Beds, RoomFormData } from '@/features/accommodation/hotel/room/types/roomForm';

export type RoomFormInitial = Partial<RoomFormData> & { id?: string };

type RoomFormProps = {
  accommodationId: string;
  roomId?: string;
  initialData?: RoomFormInitial;
  state?: FormState;
  currencyOptions: { value: string; label: string }[];
};

const parseAmenities = (
  raw: string | string[] | undefined,
  fallback: AccommodationAmenityType[],
): AccommodationAmenityType[] => {
  if (typeof raw !== 'string' || !raw) return fallback;
  try {
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as AccommodationAmenityType[]) : fallback;
  } catch {
    return fallback;
  }
};

const parseBed = (raw: string | string[] | undefined, fallback?: number): number | '' => {
  if (typeof raw === 'string' && raw.trim() !== '') {
    const parsed = Number(raw);
    return Number.isNaN(parsed) ? (fallback ?? '') : parsed;
  }
  return fallback ?? '';
};

/** Standard add/edit room form (server-action backed, shared form layout). */
export const RoomForm = ({
  accommodationId,
  roomId,
  initialData,
  state,
  currencyOptions,
}: RoomFormProps) => {
  const isEditMode = Boolean(roomId ?? initialData?.id);
  const effectiveRoomId = roomId ?? initialData?.id ?? '';
  const values = state?.values;
  const errors = state?.errors;

  const amenitiesFallback = (initialData?.amenities ?? []) as AccommodationAmenityType[];
  const amenitiesDefaults = parseAmenities(values?.amenitiesJson, amenitiesFallback);

  const beds = (initialData?.beds ?? {}) as Beds;

  return (
    <form
      action={
        isEditMode
          ? updateRoomAction.bind(null, accommodationId, effectiveRoomId)
          : createRoomAction.bind(null, accommodationId)
      }
    >
      <ModificationFormHeader
        title={{
          edit: `Edit ${initialData?.title || 'Room'}`,
          create: 'Add Room',
        }}
        description={{
          edit: 'Update room details, pricing and amenities.',
          create: 'Add a new room to this hotel and configure its details.',
        }}
        isEditMode={isEditMode}
        submitButtonLabel={isEditMode ? 'Update Room' : 'Add Room'}
      />

      <FormStateToast state={state} successMessage="Room saved successfully" />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <ModificationFormSection icon={IconInfoCircle} title="General Information">
            <div className="grid grid-cols-1 gap-x-6 md:grid-cols-2">
              <FieldWithError
                required
                htmlFor="title"
                label="Room Title"
                error={errors?.title}
                className="md:col-span-2"
              >
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
                htmlFor="capacity"
                label="Capacity (guests)"
                error={errors?.capacity}
              >
                <NumberInput
                  id="capacity"
                  name="capacity"
                  defaultValue={str(values?.capacity, String(initialData?.capacity ?? ''))}
                  placeholder="Enter capacity"
                  aria-invalid={Boolean(errors?.capacity)}
                />
              </FieldWithError>

              <FieldWithError required htmlFor="count" label="Units Count" error={errors?.count}>
                <NumberInput
                  id="count"
                  name="count"
                  defaultValue={str(values?.count, String(initialData?.count ?? 1))}
                  placeholder="Enter count"
                  aria-invalid={Boolean(errors?.count)}
                />
              </FieldWithError>
            </div>
          </ModificationFormSection>

          <ModificationFormSection icon={IconMoneybag} title="Pricing">
            <div className="grid grid-cols-1 gap-x-6 md:grid-cols-2">
              <FieldWithError required htmlFor="price" label="Price / night" error={errors?.price}>
                <NumberInput
                  id="price"
                  name="price"
                  step={0.1}
                  defaultValue={str(values?.price, String(initialData?.price ?? ''))}
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
                  defaultValue={str(values?.currencyId, initialData?.currencyId ?? '')}
                  placeholder="Select a currency"
                  options={currencyOptions}
                  aria-invalid={Boolean(errors?.currencyId)}
                />
              </FieldWithError>

              <FieldWithError
                htmlFor="discount"
                label="Discount (%)"
                error={errors?.discount}
                className="md:col-span-2"
              >
                <NumberInput
                  id="discount"
                  name="discount"
                  step={0.1}
                  defaultValue={str(values?.discount, String(initialData?.discount ?? ''))}
                  placeholder="Enter discount percentage"
                  aria-invalid={Boolean(errors?.discount)}
                />
              </FieldWithError>
            </div>
          </ModificationFormSection>

          <ModificationFormSection icon={IconRuler} title="Specifications">
            <div className="grid grid-cols-1 gap-x-6 md:grid-cols-3">
              <FieldWithError required htmlFor="area" label="Area (m²)" error={errors?.area}>
                <NumberInput
                  id="area"
                  name="area"
                  step="any"
                  defaultValue={str(values?.area, String(initialData?.area ?? ''))}
                  placeholder="Enter area"
                  aria-invalid={Boolean(errors?.area)}
                />
              </FieldWithError>

              <FieldWithError htmlFor="bedrooms" label="Bedrooms" error={errors?.bedrooms}>
                <NumberInput
                  id="bedrooms"
                  name="bedrooms"
                  defaultValue={str(values?.bedrooms, String(initialData?.bedrooms ?? ''))}
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
                  defaultValue={str(values?.bathrooms, String(initialData?.bathrooms ?? ''))}
                  placeholder="Enter bathrooms count"
                  aria-invalid={Boolean(errors?.bathrooms)}
                />
              </FieldWithError>
            </div>
          </ModificationFormSection>

          <ModificationFormSection icon={IconBed} title="Beds">
            <div className="grid grid-cols-2 gap-x-6 md:grid-cols-4">
              {(['king', 'queen', 'double', 'single'] as const).map((bed) => (
                <FieldWithError
                  key={bed}
                  htmlFor={`bed_${bed}`}
                  label={`${bed[0]?.toUpperCase()}${bed.slice(1)} beds`}
                >
                  <NumberInput
                    id={`bed_${bed}`}
                    name={`bed_${bed}`}
                    defaultValue={parseBed(values?.[`bed_${bed}`], beds[bed])}
                    placeholder="0"
                  />
                </FieldWithError>
              ))}
            </div>
          </ModificationFormSection>

        </div>

        <div className="space-y-6">
          <AccommodationAmenityIsland initial={amenitiesFallback} defaults={amenitiesDefaults} />

          <RoomGalleryIsland
            accommodationId={accommodationId}
            roomId={isEditMode ? effectiveRoomId : undefined}
            roomTitle={initialData?.title}
            errors={errors}
          />

          <div className="relative overflow-hidden rounded-3xl bg-blue-600 p-6 text-white">
            <div className="relative z-10 flex h-full flex-col">
              <h3 className="mb-2 text-lg font-bold">Need Help?</h3>
              <p className="mb-4 text-sm text-blue-100">
                Check our documentation for advanced room management.
              </p>
              <button
                type="button"
                className="mt-auto w-full rounded-xl bg-white py-2 text-sm font-bold text-blue-600 transition-colors hover:bg-blue-50"
              >
                View Guide
              </button>
            </div>

            <div className="absolute -right-4 -bottom-4 rotate-12 transform opacity-20">
              <IconBed size={120} />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
