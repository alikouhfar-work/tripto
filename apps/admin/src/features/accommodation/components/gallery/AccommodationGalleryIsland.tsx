'use client';

import { DocumentUploader } from '@/components/shared/DocumentUploader';
import { FieldWithError } from '@/components/shared/FieldWithError';
import { ModificationFormSection } from '@/components/shared/ModificationFormSection';
import { ActivityImageUploader } from '@/features/activity/components/ActivityImageUploader';
import { ImagesPreviewWrapper } from '@/features/document/components/ImagesPreviewWrapper';
import { IconImageInPicture } from '@tabler/icons-react';
import { useEffect, useRef, useState } from 'react';
import { AccommodationGalleryProps } from '@/features/accommodation/types/accommodationGallery';

const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/webp', 'image/avif'].join(',');

type AccommodationGalleryIslandProps = AccommodationGalleryProps & {
  errors?: Record<string, string>;
};

export const AccommodationGalleryIsland = ({
  accommodation,
  errors,
}: AccommodationGalleryIslandProps) => {
  const [galleryImages, setGalleryImages] = useState<File[]>([]);

  const galleryInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const galleryInput = galleryInputRef.current;
    if (galleryInput) {
      const dataTransfer = new DataTransfer();
      galleryImages.forEach((file) => dataTransfer.items.add(file));
      galleryInput.files = dataTransfer.files;
    }
  }, [galleryImages]);

  const heroImageObject = `${accommodation?.id}/hero.webp`;
  const galleryImagesPrefix = `${accommodation?.id}/gallery`;

  return (
    <ModificationFormSection icon={IconImageInPicture} title="Gallery">
      <div className="flex flex-col">
        <FieldWithError label="Hero Image" htmlFor="heroImage" error={errors?.heroImage}>
          <ActivityImageUploader
            name="heroImage"
            bucket="accommodations"
            object={heroImageObject}
            recordId={accommodation?.id}
            title={accommodation?.title}
          />
        </FieldWithError>

        <FieldWithError
          label="Gallery Images"
          htmlFor="galleryImages"
          error={errors?.galleryImages}
        >
          <DocumentUploader
            multiple
            ref={() => undefined}
            value={galleryImages}
            onChange={(file) =>
              setGalleryImages(!file ? [] : Array.isArray(file) ? file : [file])
            }
          />
          <input
            ref={galleryInputRef}
            multiple
            type="file"
            name="galleryImages"
            accept={ALLOWED_TYPES}
            className="hidden"
            aria-hidden="true"
            tabIndex={-1}
            onChange={() => undefined}
          />
        </FieldWithError>
        {accommodation && (
          <ImagesPreviewWrapper
            className="size-20"
            id={accommodation.id}
            bucket="accommodations"
            title={accommodation.title}
            prefix={galleryImagesPrefix}
          />
        )}
      </div>
    </ModificationFormSection>
  );
};
