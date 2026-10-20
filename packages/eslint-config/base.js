// Shared base: strict TS, no framework opinions.
// Apps extend this via ./next-js or ./react-internal.
// NOTE: keep zero extra deps — Next.js TS rules come from eslint-config-next/typescript.
export const baseConfig = [
  {
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
];
