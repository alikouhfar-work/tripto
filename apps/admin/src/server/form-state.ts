import { redirect } from 'next/navigation';

/**
 * Shared flash-state for fully server-rendered forms (no `use client`,
 * no `useActionState`). Server actions validate + on any outcome redirect:
 *   - success  -> redirect to the given path (optionally with { success })
 *   - failure  -> redirect back with { errors, values, message } encoded
 * Pages decode `searchParams.form` and pass it to the Server Component form,
 * which renders `defaultValue`/`defaultChecked` + inline errors.
 * File inputs cannot round-trip (browser limitation) — they reset on failure.
 */
export type FormState = {
  errors?: Record<string, string>;
  message?: string;
  success?: boolean;
  values?: Record<string, string | string[]>;
};

const toBase64Url = (json: string): string => {
  return Buffer.from(json, 'utf8').toString('base64url');
};

const fromBase64Url = (encoded: string): string => {
  return Buffer.from(encoded, 'base64url').toString('utf8');
};

export const encodeFormState = (state: FormState): string => {
  return toBase64Url(JSON.stringify(state));
};

const isStringRecord = (value: unknown): value is Record<string, string> =>
  !!value &&
  typeof value === 'object' &&
  !Array.isArray(value) &&
  Object.values(value).every((v) => typeof v === 'string');

const isValuesRecord = (value: unknown): value is Record<string, string | string[]> =>
  !!value &&
  typeof value === 'object' &&
  !Array.isArray(value) &&
  Object.values(value).every(
    (v) => typeof v === 'string' || (Array.isArray(v) && v.every((i) => typeof i === 'string')),
  );

export const decodeFormState = (encoded?: string | string[]): FormState | undefined => {
  if (!encoded || Array.isArray(encoded)) return undefined;
  try {
    const parsed: unknown = JSON.parse(fromBase64Url(encoded));
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return undefined;
    // Shape-validate: crafted ?form= must not mistype form components.
    const { errors, message, success, values } = parsed as Record<string, unknown>;
    if (errors !== undefined && !isStringRecord(errors)) return undefined;
    if (values !== undefined && !isValuesRecord(values)) return undefined;
    if (message !== undefined && typeof message !== 'string') return undefined;
    if (success !== undefined && typeof success !== 'boolean') return undefined;
    return { errors, message, success, values } as FormState;
  } catch {
    return undefined;
  }
};

/** Pick a single string from decoded form values (multi-values fall back). */
export const stringValue = (value: string | string[] | undefined, fallback = ''): string => {
  return typeof value === 'string' ? value : fallback;
};

/**
 * Map action failures to UI-safe messages: known domain errors pass through,
 * raw DB/driver text (P2002, connection errors, …) collapses to the fallback.
 */
export const actionErrorMessage = (
  error: unknown,
  known: readonly string[],
  fallback: string,
): string => {
  const message = error instanceof Error && error.message ? error.message : fallback;
  return known.includes(message) ? message : fallback;
};

/** Flatten FormData into URL-safe values (multi-values kept as arrays). */
export const formDataToValues = (formData: FormData): Record<string, string | string[]> => {
  const values: Record<string, string | string[]> = {};
  for (const key of new Set(formData.keys())) {
    const all = formData.getAll(key).map((v) => (typeof v === 'string' ? v : ''));
    values[key] = all.length > 1 ? all : (all[0] ?? '');
  }
  return values;
};

export const withFormState = (path: string, state: FormState): string => {
  const separator = path.includes('?') ? '&' : '?';
  return `${path}${separator}form=${encodeCappedFormState(state)}`;
};

/**
 * URLs break past ~8k chars (proxies/logs). Round-tripped `values` are the
 * bulk (descriptions, JSON arrays) — drop them first so errors + message
 * always survive; fall back to message-only if still oversized.
 */
const MAX_FORM_STATE_CHARS = 4000;

const encodeCappedFormState = (state: FormState): string => {
  let json = JSON.stringify(state);
  if (json.length > MAX_FORM_STATE_CHARS && state.values) {
    json = JSON.stringify({ ...state, values: undefined });
  }
  if (json.length > MAX_FORM_STATE_CHARS) {
    json = JSON.stringify({ message: state.message ?? 'Something went wrong' });
  }
  return toBase64Url(json);
};

/** Redirect back to `path` carrying validation errors + submitted values. */
export const redirectWithFormState = (path: string, state: FormState): never => {
  redirect(withFormState(path, state));
};
