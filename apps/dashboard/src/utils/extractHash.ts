export const extractHash = (key: string): string => {
  const parts = key.split('/');
  const filename = parts[parts.length - 1];
  return filename ? filename.replace('.webp', '') : '';
};
