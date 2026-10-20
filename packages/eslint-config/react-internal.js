import { baseConfig } from './base.js';

// For shared React packages (@repo/ui, @repo/utils, ...).
// Usage: `import { reactInternalConfig } from "@repo/eslint-config/react-internal";`
export const reactInternalConfig = [
  ...baseConfig,
  {
    rules: {
      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
  },
];
