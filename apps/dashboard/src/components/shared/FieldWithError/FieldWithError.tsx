import { Label } from '@/components/ui/label';
import { IconAsterisk } from '@tabler/icons-react';
import { FC } from 'react';
import { FieldWithErrorProps } from './types';

export const FieldWithError: FC<FieldWithErrorProps> = ({
  error,
  label,
  htmlFor,
  children,
  required,
  className,
}) => {
  return (
    <div className={className}>
      {label && (
        <Label
          htmlFor={htmlFor}
          className="mb-2 ml-1 flex gap-1 text-xs font-semibold tracking-wider text-zinc-600 uppercase dark:text-zinc-400"
        >
          <span>{label}</span>
          {required && <IconAsterisk size={8} strokeWidth={4} className="text-red-600" />}
        </Label>
      )}
      {children}
      <p className="mt-1 ml-1 h-5 text-xs text-red-500">{error}</p>
    </div>
  );
};
