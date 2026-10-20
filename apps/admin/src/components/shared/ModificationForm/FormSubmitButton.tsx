'use client';

import { useFormStatus } from 'react-dom';
import { ButtonPrimary } from '@/components/shared/ButtonPrimary';
import { IconDeviceFloppy, IconLoader2 } from '@tabler/icons-react';

/** Submit button with real pending feedback for server-action forms. */
export const FormSubmitButton = ({ label, className }: { label: string; className?: string }) => {
  const { pending } = useFormStatus();

  return (
    <ButtonPrimary
      size="lg"
      type="submit"
      disabled={pending}
      className={className}
      endIcon={
        pending ? (
          <IconLoader2 className="size-5 animate-spin" />
        ) : (
          <IconDeviceFloppy strokeWidth={1.8} className="size-5" />
        )
      }
    >
      {pending ? 'Saving…' : label}
    </ButtonPrimary>
  );
};
