'use client';

import { useState, type FormEvent, type ReactNode } from 'react';

/**
 * Minimal client island for row deletion: first click arms ("Sure?"),
 * second click submits the server action. Keeps DataTable fully server-rendered.
 */
export const DeleteRowForm = ({
  action,
  children,
}: {
  action: (formData: FormData) => void;
  children: ReactNode;
}) => {
  const [confirming, setConfirming] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    if (!confirming) {
      event.preventDefault();
      setConfirming(true);
      return;
    }
    setConfirming(false);
  };

  return (
    <form action={action} onSubmit={onSubmit} className="inline">
      <button type="submit" aria-label={confirming ? 'Confirm delete' : 'Delete'}>
        {children}
      </button>
      {confirming && <span className="ml-1 text-xs font-medium text-red-600">Sure?</span>}
    </form>
  );
};
