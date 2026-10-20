'use client';

import { DocumentUploader } from '@/components/shared/DocumentUploader';
import { FieldWithError } from '@/components/shared/FieldWithError';
import { ModificationFormSection } from '@/components/shared/ModificationFormSection';
import { ImagesPreviewWrapper } from '@/features/document/components/ImagesPreviewWrapper';
import { IconImageInPicture } from '@tabler/icons-react';
import { useEffect, useRef, useState } from 'react';

const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/webp', 'image/avif'].join(',');

type RoomGalleryIslandProps = {
  accommodationId: string;
  roomId?: string;
  roomTitle?: string;
  errors?: Record<string, string>;
};

/**
 * Room gallery uploader — same implementation, behavior and design as the
 * gallery uploader used in HotelForm (`AccommodationGalleryIsland`):
 * a `DocumentUploader` bound to local file state, synced into a hidden
 * form input via `DataTransfer`, plus existing images via
 * `ImagesPreviewWrapper` in edit mode.
 */
export const RoomGalleryIsland = ({
  accommodationId,
  roomId,
  roomTitle,
  errors,
}: RoomGalleryIslandProps) => {
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

  const isEditMode = Boolean(roomId);
  const fieldName = isEditMode ? 'newGalleryImages' : 'galleryImages';

  return (
    <ModificationFormSection icon={IconImageInPicture} title="Room Gallery">
      <div className="flex flex-col">
        <FieldWithError
          label={isEditMode ? 'Upload new images' : 'Gallery images'}
          htmlFor={fieldName}
          error={errors?.[fieldName]}
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
            name={fieldName}
            accept={ALLOWED_TYPES}
            className="hidden"
            aria-hidden="true"
            tabIndex={-1}
            onChange={() => undefined}
          />
        </FieldWithError>
        {isEditMode && roomId && (
          <ImagesPreviewWrapper
            className="size-20"
            category="roomGallery"
            bucket="accommodations"
            id={roomId}
            prefix={`${accommodationId}/rooms/${roomId}/gallery`}
            title={roomTitle ?? 'Room'}
          />
        )}
      </div>
    </ModificationFormSection>
  );
};
