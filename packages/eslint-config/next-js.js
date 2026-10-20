import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import { baseConfig } from './base.js';

// Canonical Next.js config for apps/client + apps/dashboard.
// Usage: `import { nextJsConfig } from "@repo/eslint-config/next-js"; export default nextJsConfig;`
export const nextJsConfig = defineConfig([
  ...baseConfig,
  ...nextVitals,
  ...nextTs,
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),
]);
