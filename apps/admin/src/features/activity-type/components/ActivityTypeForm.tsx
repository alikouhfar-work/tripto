import { FieldWithError } from '@/components/shared/FieldWithError';
import { FormStateToast } from '@/components/shared/FormStateToast';
import { ModificationFormSection } from '@/components/shared/ModificationFormSection';
import { ModificationFormHeader } from '@/components/shared/ModificationForm';
import { Input } from '@/components/ui/input';
import { stringValue as str } from '@/server/form-state';
import { IconCategory, IconInfoCircle } from '@tabler/icons-react';
import { createActivityTypeAction, updateActivityTypeAction } from '../server/commands';
import type { ActivityTypeFormProps } from '../types/activityType';

export const ActivityTypeForm = ({ initialData, state }: ActivityTypeFormProps) => {
  const isEditMode = Boolean(initialData?.id);
  const values = state?.values;
  const errors = state?.errors;

  return (
    <form
      action={
        isEditMode
          ? updateActivityTypeAction.bind(null, initialData?.id ?? '')
          : createActivityTypeAction
      }
    >
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
        submitButtonLabel={isEditMode ? 'Update Activity Type' : 'Create Activity Type'}
      />

      <FormStateToast state={state} successMessage="Activity type updated successfully" />

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

              <FieldWithError htmlFor="emoji" label="Emoji" error={errors?.emoji}>
                <Input
                  id="emoji"
                  name="emoji"
                  defaultValue={str(values?.emoji, initialData?.emoji ?? '')}
                  placeholder="Enter an emoji"
                  aria-invalid={Boolean(errors?.emoji)}
                />
              </FieldWithError>

              <FieldWithError required htmlFor="icon" label="Icon" error={errors?.icon}>
                <Input
                  id="icon"
                  name="icon"
                  defaultValue={str(values?.icon, initialData?.icon ?? '')}
                  placeholder="Enter an icon from Tabler Icons"
                  aria-invalid={Boolean(errors?.icon)}
                />
              </FieldWithError>

              <FieldWithError required htmlFor="name" label="Name" error={errors?.name}>
                <Input
                  id="name"
                  name="name"
                  defaultValue={str(values?.name, initialData?.name ?? '')}
                  placeholder="Enter a name"
                  aria-invalid={Boolean(errors?.name)}
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
