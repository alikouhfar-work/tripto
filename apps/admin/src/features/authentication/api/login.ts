'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { LoginFormData } from '@/features/authentication/types/authentication';
import { AUTHENTICATION_ERRORS } from '@/features/authentication/constants';

export const login = async (data: LoginFormData) => {
  try {
    return await signIn('credentials', {
      username: data.username,
      password: data.password,
      redirect: false,
    });
  } catch (err) {
    const error = err as AuthError;
    if (error?.type === 'CredentialsSignin' || error?.message === 'CredentialsSignin') {
      throw new Error(AUTHENTICATION_ERRORS.INVALID_CREDENTIALS);
    }
    throw new Error(AUTHENTICATION_ERRORS.LOGIN_FAILED);
  }
};
