import { auth, STAFF_ROLES } from '@/auth';

/**
 * Guard for Server Actions / queries. Requires an authenticated STAFF session
 * (Admin/Manager) — Guests and anonymous callers get 'Unauthorized'.
 * This is the single choke point covering every command flow.
 */
export const requireUserId = async (): Promise<string> => {
  const session = await auth();
  const user = session?.user;
  const roleOk =
    !!user?.role && (STAFF_ROLES as readonly string[]).includes(user.role);
  if (!user?.id || !roleOk) throw new Error('Unauthorized');
  return user.id;
};
