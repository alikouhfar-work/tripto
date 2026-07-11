'use client';

import { FieldWithError } from '@/components/shared/FieldWithError';
import { ModificationFormSection } from '@/components/shared/ModificationFormSection';
import { Input } from '@/components/ui/input';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import { getTablerIcon } from '@/utils/getTablerIcon';
import { zodResolver } from '@hookform/resolvers/zod';
import { Icon, IconCategory, IconInfoCircle } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { type FC, useEffect, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useCreateActivityType } from '../hooks/useCreateActivityType';
import { useUpdateActivityType } from '../hooks/useUpdateActivityType';
import { ActivityTypeSchema, activityTypeSchema } from '../schema';
import { ActivityTypeFormProps } from '../types/activityType';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { ModificationFormHeader } from '@/components/shared/ModificationForm';

export const ActivityTypeForm: FC<ActivityTypeFormProps> = ({ initialData }) => {
  const router = useRouter();
  const isEditMode = Boolean(initialData?.id);
  const createActivityTypeMutation = useCreateActivityType();
  const updateActivityTypeMutation = useUpdateActivityType();
  const isSubmitting = updateActivityTypeMutation.isPending || createActivityTypeMutation.isPending;

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ActivityTypeSchema>({
    mode: 'onChange',
    resolver: zodResolver(activityTypeSchema),
    defaultValues: {
      icon: '',
      name: '',
      emoji: '',
      title: '',
      isActive: true,
    },
  });

  const submitButtonLabel = useMemo(() => {
    if (isSubmitting) {
      return isEditMode ? 'Updating...' : 'Creating...';
    }

    return isEditMode ? 'Update Activity Type' : 'Create Activity Type';
  }, [isEditMode, isSubmitting]);

  const onSubmit = async (formData: ActivityTypeSchema) => {
    initialData?.id
      ? updateActivityTypeMutation.mutateAsync({ id: initialData.id, data: formData })
      : createActivityTypeMutation.mutateAsync(formData).then(() => router.push('/activity-types'));
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
          create: 'Create Activity Type',
          edit: `Edit ${initialData?.title}`,
        }}
        description={{
          edit: 'Update activity type details and availability.',
          create: 'Create a new activity type and configure its details.',
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
            <div className="grid grid-cols-1 gap-x-6 md:grid-cols-2">
              <FieldWithError required htmlFor="title" label="Title" error={errors.title?.message}>
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

              <FieldWithError htmlFor="emoji" label="Emoji" error={errors.emoji?.message}>
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

              <FieldWithError required htmlFor="icon" label="Icon" error={errors.icon?.message}>
                <Controller
                  name="icon"
                  control={control}
                  render={({ field, fieldState }) => {
                    const Icon = getTablerIcon(field.value) as Icon;

                    return (
                      <InputGroup>
                        <InputGroupInput
                          id="icon"
                          {...field}
                          placeholder="Enter an icon from Tabler Icons"
                          aria-invalid={!!fieldState.error}
                        />
                        <InputGroupAddon>
                          {Icon && <Icon className="size-5 text-zinc-600" />}
                        </InputGroupAddon>
                      </InputGroup>
                    );
                  }}
                />
              </FieldWithError>

              <FieldWithError required htmlFor="name" label="Name" error={errors.name?.message}>
                <Controller
                  name="name"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Input
                      id="name"
                      {...field}
                      placeholder="Enter a name"
                      disabled={isEditMode}
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
                Check our documentation for advanced activity type management.
              </p>
              <button
                type="button"
                className="mt-auto w-full rounded-xl bg-white py-2 text-sm font-bold text-blue-600 transition-colors hover:bg-blue-50"
              >
                View Guide
              </button>
            </div>

            <div className="absolute -right-4 -bottom-4 rotate-12 transform opacity-20">
              <IconCategory size={120} />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
