'use client';

import { useEffect, useRef } from 'react';
import { toast } from 'react-hot-toast';
import type { FormState } from '@/server/form-state';

type FormStateToastProps = {
  /** Flash state decoded from `?form=` after a server-action redirect. */
  state?: FormState | null;
  /** Message shown when `state.success` is true. */
  successMessage?: string;
};

/**
 * Global toast policy for server-rendered forms: server responses are
 * surfaced via react-hot-toast instead of inline banners. Renders nothing.
 */
export const FormStateToast = ({ state, successMessage }: FormStateToastProps) => {
  const firedFor = useRef<string | null>(null);

  useEffect(() => {
    const errorMessage = state?.message ?? state?.errors?.general;
    const key = errorMessage
      ? `error:${errorMessage}`
      : state?.success && successMessage
        ? `success:${successMessage}`
        : null;
    if (!key || firedFor.current === key) return;
    firedFor.current = key;
    if (errorMessage) toast.error(errorMessage);
    else if (successMessage) toast.success(successMessage);
  }, [state, successMessage]);

  return null;
};
