export const extractHash = (key: string): string => {
  const parts = key.split('/');
  const filename = parts[parts.length - 1];
  // Strip only a trailing suffix — a mid-name '.webp' must not corrupt the hash.
  return filename ? filename.replace(/\.webp$/, '') : '';
};
