import { ALLOWED_IMAGE_TYPES, MAX_GALLERY_FILES, MAX_IMAGE_SIZE } from './fileConstants';

const isNonEmptyFile = (file: unknown): file is File =>
  file instanceof File && file.size > 0;

export const validateHotelFiles = (
  heroImage: unknown,
  galleryImages: unknown,
): Record<string, string> => {
  const errors: Record<string, string> = {};

  if (isNonEmptyFile(heroImage)) {
    if (!ALLOWED_IMAGE_TYPES.includes(heroImage.type)) {
      errors.heroImage = 'Only PNG, JPG, WEBP or AVIF files are allowed';
    } else if (heroImage.size > MAX_IMAGE_SIZE) {
      errors.heroImage = 'Each file size must be under 5MB';
    }
  }

  const gallery = Array.isArray(galleryImages) ? galleryImages.filter(isNonEmptyFile) : [];
  if (gallery.length > MAX_GALLERY_FILES) {
    errors.galleryImages = `At most ${MAX_GALLERY_FILES} gallery images are allowed`;
  } else if (
    gallery.some((file) => !ALLOWED_IMAGE_TYPES.includes(file.type) || file.size > MAX_IMAGE_SIZE)
  ) {
    errors.galleryImages = 'Some gallery files are invalid (type or size)';
  }

  return errors;
};

export const validateRoomFiles = (
  galleryImages: unknown,
): Record<string, string> => {
  const errors: Record<string, string> = {};

  const gallery = Array.isArray(galleryImages) ? galleryImages.filter(isNonEmptyFile) : [];
  if (gallery.length > MAX_GALLERY_FILES) {
    errors.galleryImages = `At most ${MAX_GALLERY_FILES} gallery images are allowed`;
  } else if (
    gallery.some((file) => !ALLOWED_IMAGE_TYPES.includes(file.type) || file.size > MAX_IMAGE_SIZE)
  ) {
    errors.galleryImages = 'Some gallery files are invalid (type or size)';
  }

  return errors;
};
