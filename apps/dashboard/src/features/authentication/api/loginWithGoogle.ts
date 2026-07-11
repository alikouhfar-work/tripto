'use server'

import { signIn } from '@/auth';

export const loginWithGoogle = async () => await signIn('google', { redirectTo: '/' });
