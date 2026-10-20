import { FC } from 'react';
import {
  ModeValue,
  ModificationFormTitle,
} from '@/components/shared/ModificationForm/ModificationFormTitle';
import { FormSubmitButton } from './FormSubmitButton';

type ModificationFormHeaderProps = {
  title: ModeValue;
  description: ModeValue;
  isEditMode: boolean;
  submitButtonLabel: string;
};

export const ModificationFormHeader: FC<ModificationFormHeaderProps> = ({
  title,
  isEditMode,
  description,
  submitButtonLabel,
}) => {
  return (
    <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
      <ModificationFormTitle title={title} isEditMode={isEditMode} description={description} />

      <FormSubmitButton label={submitButtonLabel} />
    </div>
  );
};
