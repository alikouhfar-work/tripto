'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { LoginFormData } from '@/features/authentication/types/authentication';
import { login } from '@/features/authentication/api/login';
import { AUTHENTICATION_ERRORS, AUTHENTICATION_SUCCESS } from '@/features/authentication/constants';

export const useLogin = () => {
  const router = useRouter();
  const { update: updateSession } = useSession();
  const [isPending, setIsPending] = useState(false);

  const mutateAsync = async (data: LoginFormData) => {
    setIsPending(true);

    const promise = login(data).then(async (response) => {
      await updateSession();
      return response;
    });

    toast.promise(promise, {
      loading: 'Logging in...',
      success: AUTHENTICATION_SUCCESS.LOGIN,
      error: (err) => (err instanceof Error ? err.message : AUTHENTICATION_ERRORS.LOGIN_FAILED),
    });

    try {
      await promise;
      router.replace('/');
    } finally {
      setIsPending(false);
    }
  };

  return { mutateAsync, isPending };
};
