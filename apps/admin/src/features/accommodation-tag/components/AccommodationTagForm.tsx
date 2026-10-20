import { FieldWithError } from '@/components/shared/FieldWithError';
import { FormStateToast } from '@/components/shared/FormStateToast';
import { ModificationFormSection } from '@/components/shared/ModificationFormSection';
import { ModificationFormHeader } from '@/components/shared/ModificationForm';
import { Input } from '@/components/ui/input';
import { AccommodationTagColorField } from '@/features/accommodation-tag/components/AccommodationTagColorField';
import { stringValue as str } from '@/server/form-state';
import { IconInfoCircle, IconTag } from '@tabler/icons-react';
import {
  createAccommodationTagAction,
  updateAccommodationTagAction,
} from '../server/commands';
import type { AccommodationTagFormProps } from '@/features/accommodation-tag/types/accommodationTag';

export const AccommodationTagForm = ({
  initialData,
  state,
}: AccommodationTagFormProps) => {
  const isEditMode = Boolean(initialData?.id);
  const values = state?.values;
  const errors = state?.errors;

  return (
    <form
      action={
        isEditMode
          ? updateAccommodationTagAction.bind(null, initialData?.id ?? '')
          : createAccommodationTagAction
      }
    >
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
        submitButtonLabel={isEditMode ? 'Update Accommodation Tag' : 'Create Accommodation Tag'}
      />

      <FormStateToast state={state} successMessage="Accommodation tag updated successfully" />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <ModificationFormSection icon={IconInfoCircle} title="General Information">
            <div className="grid grid-cols-1 gap-x-6 lg:grid-cols-6">
              <FieldWithError
                required
                htmlFor="title"
                label="Title"
                className="lg:col-span-3"
                error={errors?.title}
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
                htmlFor="emoji"
                label="Emoji"
                className="lg:col-span-3"
                error={errors?.emoji}
              >
                <Input
                  id="emoji"
                  name="emoji"
                  defaultValue={str(values?.emoji, initialData?.emoji ?? '')}
                  placeholder="Enter an emoji"
                  aria-invalid={Boolean(errors?.emoji)}
                />
              </FieldWithError>

              <FieldWithError
                required
                htmlFor="textColor"
                label="Text Color"
                error={errors?.textColor}
                className="lg:col-span-2"
              >
                <AccommodationTagColorField
                  id="textColor"
                  name="textColor"
                  defaultValue={str(values?.textColor, initialData?.textColor ?? '#000000')}
                  invalid={Boolean(errors?.textColor)}
                />
              </FieldWithError>

              <FieldWithError
                required
                htmlFor="borderColor"
                label="Border Color"
                error={errors?.borderColor}
                className="lg:col-span-2"
              >
                <AccommodationTagColorField
                  id="borderColor"
                  name="borderColor"
                  defaultValue={str(values?.borderColor, initialData?.borderColor ?? '#000000')}
                  invalid={Boolean(errors?.borderColor)}
                />
              </FieldWithError>

              <FieldWithError
                required
                htmlFor="backgroundColor"
                label="Background Color"
                error={errors?.backgroundColor}
                className="lg:col-span-2"
              >
                <AccommodationTagColorField
                  id="backgroundColor"
                  name="backgroundColor"
                  defaultValue={str(
                    values?.backgroundColor,
                    initialData?.backgroundColor ?? '#000000',
                  )}
                  invalid={Boolean(errors?.backgroundColor)}
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
