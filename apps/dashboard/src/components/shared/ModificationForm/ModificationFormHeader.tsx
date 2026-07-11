import { FC } from 'react';
import { ButtonPrimary } from '@/components/shared/ButtonPrimary';
import { IconDeviceFloppy } from '@tabler/icons-react';
import {
  ModeValue,
  ModificationFormTitle,
} from '@/components/shared/ModificationForm/ModificationFormTitle';

type ModificationFormHeaderProps = {
  title: ModeValue;
  description: ModeValue;
  isEditMode: boolean;
  isSubmitting: boolean;
  submitButtonLabel: string;
};

export const ModificationFormHeader: FC<ModificationFormHeaderProps> = ({
  title,
  isEditMode,
  description,
  isSubmitting,
  submitButtonLabel,
}) => {
  return (
    <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
      <ModificationFormTitle title={title} isEditMode={isEditMode} description={description} />

      <ButtonPrimary
        size="lg"
        type="submit"
        disabled={isSubmitting}
        endIcon={<IconDeviceFloppy strokeWidth={1.8} className="size-5" />}
      >
        {submitButtonLabel}
      </ButtonPrimary>
    </div>
  );
};
