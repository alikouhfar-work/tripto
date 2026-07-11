'use client';

import { FieldWithError } from '@/components/shared/FieldWithError';
import { ModificationFormSection } from '@/components/shared/ModificationFormSection';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { IconCurrencyDollar, IconInfoCircle } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { type FC, useEffect, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useCreateCurrency } from '../hooks/useCreateCurrency';
import { useUpdateCurrency } from '../hooks/useUpdateCurrency';
import { CurrencySchema, currencySchema } from '../schema';
import { CurrencyFormProps } from '../types/currency';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { ModificationFormHeader } from '@/components/shared/ModificationForm';

export const CurrencyForm: FC<CurrencyFormProps> = ({ initialData }) => {
  const router = useRouter();
  const isEditMode = Boolean(initialData?.id);
  const createCurrencyMutation = useCreateCurrency();
  const updateCurrencyMutation = useUpdateCurrency();
  const isSubmitting = updateCurrencyMutation.isPending || createCurrencyMutation.isPending;

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CurrencySchema>({
    mode: 'onChange',
    resolver: zodResolver(currencySchema),
    defaultValues: {
      title: '',
      symbol: '',
      isoCode: '',
      isActive: true,
    },
  });

  const submitButtonLabel = useMemo(() => {
    if (isSubmitting) {
      return isEditMode ? 'Updating...' : 'Creating...';
    }

    return isEditMode ? 'Update Currency' : 'Create Currency';
  }, [isEditMode, isSubmitting]);

  const onSubmit = async (formData: CurrencySchema) => {
    initialData?.id
      ? updateCurrencyMutation.mutateAsync({ id: initialData.id, data: formData })
      : createCurrencyMutation.mutateAsync(formData).then(() => router.push('/currencies'));
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
          create: 'Create Currency',
          edit: `Edit ${initialData?.title}`,
        }}
        description={{
          edit: 'Update currency details and availability.',
          create: 'Create a new currency and configure its details.',
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

              <FieldWithError
                required
                htmlFor="isoCode"
                label="ISO Code"
                error={errors.isoCode?.message}
              >
                <Controller
                  name="isoCode"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Input
                      id="isoCode"
                      {...field}
                      placeholder="Enter a isoCode"
                      aria-invalid={!!fieldState.error}
                    />
                  )}
                />
              </FieldWithError>

              <FieldWithError
                required
                htmlFor="symbol"
                label="Symbol"
                error={errors.symbol?.message}
              >
                <Controller
                  name="symbol"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Input
                      id="symbol"
                      {...field}
                      placeholder="Enter a symbol"
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
                Check our documentation for advanced currency management.
              </p>
              <button
                type="button"
                className="mt-auto w-full rounded-xl bg-white py-2 text-sm font-bold text-blue-600 transition-colors hover:bg-blue-50"
              >
                View Guide
              </button>
            </div>

            <div className="absolute -right-4 -bottom-4 rotate-12 transform opacity-20">
              <IconCurrencyDollar size={120} />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
