import { FieldWithError } from '@/components/shared/FieldWithError';
import { FormStateToast } from '@/components/shared/FormStateToast';
import { ModificationFormSection } from '@/components/shared/ModificationFormSection';
import { ModificationFormHeader } from '@/components/shared/ModificationForm';
import { Input } from '@/components/ui/input';
import { stringValue as str } from '@/server/form-state';
import { IconCurrencyDollar, IconInfoCircle } from '@tabler/icons-react';
import { createCurrencyAction, updateCurrencyAction } from '../server/commands';
import type { CurrencyFormProps } from '../types/currency';

export const CurrencyForm = ({ initialData, state }: CurrencyFormProps) => {
  const isEditMode = Boolean(initialData?.id);
  const values = state?.values;
  const errors = state?.errors;

  return (
    <form action={isEditMode ? updateCurrencyAction.bind(null, initialData?.id ?? '') : createCurrencyAction}>
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
        submitButtonLabel={isEditMode ? 'Update Currency' : 'Create Currency'}
      />

      <FormStateToast state={state} successMessage="Currency updated successfully" />

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
                htmlFor="isoCode"
                label="ISO Code"
                error={errors?.isoCode}
              >
                <Input
                  id="isoCode"
                  name="isoCode"
                  defaultValue={str(values?.isoCode, initialData?.isoCode ?? '')}
                  placeholder="Enter a isoCode"
                  aria-invalid={Boolean(errors?.isoCode)}
                />
              </FieldWithError>

              <FieldWithError
                required
                htmlFor="symbol"
                label="Symbol"
                error={errors?.symbol}
              >
                <Input
                  id="symbol"
                  name="symbol"
                  defaultValue={str(values?.symbol, initialData?.symbol ?? '')}
                  placeholder="Enter a symbol"
                  aria-invalid={Boolean(errors?.symbol)}
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
