import { FC } from 'react';

type FormMode = 'create' | 'edit';

export type ModeValue = Record<FormMode, string>;

type ModificationFormTitleProps = {
  title: ModeValue;
  className?: string;
  isEditMode: boolean;
  description: ModeValue;
};

export const ModificationFormTitle: FC<ModificationFormTitleProps> = ({
  title,
  className,
  isEditMode,
  description,
}) => {
  return (
    <div className={className}>
      <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100">
        {isEditMode ? title.edit : title.create}
      </h1>
      <p className="mt-1 text-zinc-500 dark:text-zinc-400">
        {isEditMode ? description.edit : description.create}
      </p>
    </div>
  );
};
