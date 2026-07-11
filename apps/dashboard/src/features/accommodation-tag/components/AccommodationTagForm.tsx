'use client';

import { FieldWithError } from '@/components/shared/FieldWithError';
import { ModificationFormSection } from '@/components/shared/ModificationFormSection';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { IconInfoCircle, IconTag } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import { useCreateAccommodationTag } from '../hooks/useCreateAccommodationTag';
import { useUpdateAccommodationTag } from '../hooks/useUpdateAccommodationTag';
import { AccommodationTagSchema, accommodationTagSchema } from '../schema';
import { AccommodationTagFormProps } from '@/features/accommodation-tag/types/accommodationTag';
import { type FC, useEffect, useMemo } from 'react';
import { ColorPicker } from '@/components/ui/color-picker';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { ModificationFormHeader } from '@/components/shared/ModificationForm';

export const AccommodationTagForm: FC<AccommodationTagFormProps> = ({ initialData }) => {
  const router = useRouter();
  const isEditMode = Boolean(initialData?.id);
  const createAccommodationTagMutation = useCreateAccommodationTag();
  const updateAccommodationTagMutation = useUpdateAccommodationTag();
  const isSubmitting =
    updateAccommodationTagMutation.isPending || createAccommodationTagMutation.isPending;

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AccommodationTagSchema>({
    mode: 'onChange',
    resolver: zodResolver(accommodationTagSchema),
    defaultValues: {
      emoji: '',
      title: '',
      isActive: true,
      textColor: '',
      borderColor: '',
      backgroundColor: '',
    },
  });

  const submitButtonLabel = useMemo(() => {
    if (isSubmitting) {
      return isEditMode ? 'Updating...' : 'Creating...';
    }

    return isEditMode ? 'Update Accommodation Tag' : 'Create Accommodation Tag';
  }, [isEditMode, isSubmitting]);

  const onSubmit = async (formData: AccommodationTagSchema) => {
    if (initialData?.id) {
      await updateAccommodationTagMutation.mutateAsync({ id: initialData.id, data: formData });
    } else {
      await createAccommodationTagMutation.mutateAsync(formData);
      router.push('/accommodation-tags');
    }
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
          edit: `Edit ${initialData?.title}`,
          create: 'Create Accommodation Tag',
        }}
        description={{
          edit: 'Update accommodation tag details and availability.',
          create: 'Create a new accommodation tag and configure its details.',
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
              <Controller
                name="isActive"
                control={control}
                render={({ field }) => (
                  <div className="flex flex-row gap-2">
                    <Label
                      htmlFor="isActive"
                      className="flex gap-1 text-xs font-semibold tracking-wider text-zinc-600 uppercase dark:text-zinc-400"
                    >
                      <span>Is Active</span>
                    </Label>
                    <Switch id="isActive" checked={field.value} onCheckedChange={field.onChange} />
                  </div>
                )}
              />
            }
          >
            <div className="grid grid-cols-1 gap-x-6 lg:grid-cols-6">
              <FieldWithError
                required
                htmlFor="title"
                label="Title"
                className="lg:col-span-3"
                error={errors.title?.message}
              >
                <Controller
                  name="title"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Input
                      id="title"
                      {...field}
                      placeholder="Enter a title"
                      aria-invalid={!!fieldState.error}
                    />
                  )}
                />
              </FieldWithError>

              <FieldWithError
                required
                htmlFor="emoji"
                label="Emoji"
                className="lg:col-span-3"
                error={errors.emoji?.message}
              >
                <Controller
                  name="emoji"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Input
                      id="emoji"
                      value={field.value ?? ''}
                      onChange={field.onChange}
                      placeholder="Enter an emoji"
                      aria-invalid={!!fieldState.error}
                    />
                  )}
                />
              </FieldWithError>

              <FieldWithError
                required
                htmlFor="textColor"
                label="Text Color"
                error={errors.textColor?.message}
                className="lg:col-span-2"
              >
                <Controller
                  name="textColor"
                  control={control}
                  render={({ field, fieldState }) => (
                    <ColorPicker
                      color={field.value}
                      onChange={field.onChange}
                      placeholder="Pick a text color"
                      aria-invalid={!!fieldState.error}
                    />
                  )}
                />
              </FieldWithError>
              <FieldWithError
                required
                htmlFor="borderColor"
                label="Border Color"
                error={errors.borderColor?.message}
                className="lg:col-span-2"
              >
                <Controller
                  name="borderColor"
                  control={control}
                  render={({ field, fieldState }) => (
                    <ColorPicker
                      color={field.value}
                      onChange={field.onChange}
                      placeholder="Pick a border color"
                      aria-invalid={!!fieldState.error}
                    />
                  )}
                />
              </FieldWithError>
              <FieldWithError
                required
                htmlFor="backgroundColor"
                label="Background Color"
                error={errors.backgroundColor?.message}
                className="lg:col-span-2"
              >
                <Controller
                  name="backgroundColor"
                  control={control}
                  render={({ field, fieldState }) => (
                    <ColorPicker
                      color={field.value}
                      onChange={field.onChange}
                      placeholder="Pick a background color"
                      aria-invalid={!!fieldState.error}
                    />
                  )}
                />
              </FieldWithError>
            </div>
          </ModificationFormSection>
        </div>

        <div>
          <div className="relative overflow-hidden rounded-3xl bg-blue-600 p-6 text-white">
            <div className="relative z-10 flex h-full flex-col">
              <h3 className="mb-2 text-lg font-bold">Need Help?</h3>
              <p className="mb-4 text-sm text-blue-100">
                Check our documentation for advanced accommodation tag management.
              </p>
              <button
                type="button"
                className="mt-auto w-full rounded-xl bg-white py-2 text-sm font-bold text-blue-600 transition-colors hover:bg-blue-50"
              >
                View Guide
              </button>
            </div>

            <div className="absolute -right-4 -bottom-4 rotate-12 transform opacity-20">
              <IconTag size={120} />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
