'use client';

import { queryClient } from '@/lib/query-client';
import { cn } from '@/lib/utils';
import { IconCloudUpload, IconPhoto, IconX } from '@tabler/icons-react';
import { DOCUMENT_QUERY_KEYS, useDeleteDocument, useGetDocument } from '@repo/documents/client';
import { toast } from 'react-hot-toast';

type DocumentBucket = 'activities' | 'accommodations';
import { useRef, useState, type DragEvent } from 'react';

type ImageUploaderViewProps = {
  name: string;
  accept: string;
  storedUrl?: string;
  storedLabel: string;
  isLoadingStored: boolean;
  onRemoveStored: () => Promise<void>;
};

const ImageUploaderView = ({
  name,
  accept,
  storedUrl,
  storedLabel,
  isLoadingStored,
  onRemoveStored,
}: ImageUploaderViewProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [selected, setSelected] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const [storedImageError, setStoredImageError] = useState(false);

  const previewUrl = selected ? URL.createObjectURL(selected) : null;

  const activeUrl = previewUrl ?? (isLoadingStored || storedImageError ? undefined : storedUrl);
  const activeLabel = selected ? selected.name : storedLabel;

  const pickFiles = (files: FileList | null) => {
    const file = files?.[0];
    if (!file) return;
    setSelected(file);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    pickFiles(event.dataTransfer.files);
  };

  const handleRemove = async () => {
    if (selected) {
      setSelected(null);
      if (inputRef.current) inputRef.current.value = '';
      return;
    }
    setIsRemoving(true);
    try {
      await onRemoveStored();
    } finally {
      setIsRemoving(false);
    }
  };

  return (
    <div>
      <input
        ref={inputRef}
        id={name}
        name={name}
        type="file"
        accept={accept}
        className="sr-only"
        onChange={(event) => pickFiles(event.target.files)}
      />
      {activeUrl ? (
        <div className="group relative overflow-hidden rounded-xl border border-border">
          <img
            src={activeUrl}
            alt={activeLabel}
            className="h-48 w-full object-cover"
            onError={() => setStoredImageError(true)}
          />
          <div className="flex items-center justify-between gap-2 border-t border-border bg-card px-3 py-2">
            <p className="min-w-0 flex-1 truncate text-xs text-muted-foreground">
              {activeLabel}
              {selected && (
                <span className="ml-1.5 tabular-nums">· {(selected.size / 1024).toFixed(0)} KB</span>
              )}
            </p>
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="shrink-0 rounded-md px-2 py-1 text-xs font-medium text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-500/10"
            >
              Replace
            </button>
            <button
              type="button"
              onClick={handleRemove}
              disabled={isRemoving}
              aria-label="Remove image"
              className="flex size-7 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-red-50 hover:text-red-600 disabled:opacity-50 dark:hover:bg-red-500/10 dark:hover:text-red-400"
            >
              <IconX size={15} />
            </button>
          </div>
        </div>
      ) : (
        <div
          role="button"
          tabIndex={0}
          aria-label="Upload an image"
          onClick={() => inputRef.current?.click()}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') inputRef.current?.click();
          }}
          onDragOver={(event) => {
            event.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={cn(
            'flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed px-6 py-10 text-center transition-colors outline-none',
            isDragging
              ? 'border-blue-500 bg-blue-50/70 dark:bg-blue-500/10'
              : 'border-border bg-muted/30 hover:border-blue-400 hover:bg-muted/60',
            'focus-visible:border-blue-500 focus-visible:ring-[3px] focus-visible:ring-blue-500/40',
          )}
        >
          <span className="flex size-12 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400">
            {isDragging ? <IconCloudUpload size={22} /> : <IconPhoto size={22} />}
          </span>
          <p className="text-sm font-medium text-foreground">
            Drag &amp; drop an image here, or{' '}
            <span className="text-blue-600 dark:text-blue-400">browse</span>
          </p>
          <p className="text-xs text-muted-foreground">PNG, JPG, WEBP or AVIF · max 5MB</p>
        </div>
      )}
    </div>
  );
};

type ActivityImageUploaderProps = {
  /** Form field name submitted to the server action. */
  name: string;
  bucket: DocumentBucket;
  object: string;
  /** When set (edit mode), the currently stored image is shown until replaced or removed. */
  recordId?: string;
  title?: string;
  accept?: string;
};

/**
 * Drag-and-drop hero image uploader for server-rendered forms.
 * The picked file travels with the native form submission (`name`); in edit
 * mode the currently stored image is previewed and can be removed.
 */
export const ActivityImageUploader = ({
  name,
  bucket,
  object,
  recordId,
  title,
  accept = 'image/*',
}: ActivityImageUploaderProps) => {
  if (!recordId) {
    return (
      <ImageUploaderView
        name={name}
        accept={accept}
        storedLabel={title ?? 'Image'}
        isLoadingStored={false}
        onRemoveStored={async () => undefined}
      />
    );
  }
  return <StoredImageUploader name={name} accept={accept} bucket={bucket} object={object} recordId={recordId} title={title} />;
};

const StoredImageUploader = ({
  name,
  accept,
  bucket,
  object,
  recordId,
  title,
}: Required<Pick<ActivityImageUploaderProps, 'name' | 'accept' | 'bucket' | 'object' | 'recordId'>> &
  Pick<ActivityImageUploaderProps, 'title'>) => {
  const { data: stored, isFetching: isLoadingStored } = useGetDocument({
    id: recordId,
    bucket,
    object,
    category: 'hero',
  });
  const deleteMutation = useDeleteDocument();
  const [dismissed, setDismissed] = useState(false);

  const handleRemoveStored = async () => {
    await toast.promise(
      deleteMutation.mutateAsync({ bucket, object }).then(() => {
        queryClient.removeQueries({
          queryKey: [...DOCUMENT_QUERY_KEYS.document({ id: recordId, bucket, category: 'hero', object })],
        });
        setDismissed(true);
      }),
      {
        loading: 'Deleting image…',
        success: 'Image deleted successfully',
        error: 'Delete failed. Please try again.',
      },
    );
  };

  return (
    <ImageUploaderView
      name={name}
      accept={accept}
      storedUrl={dismissed ? undefined : stored?.url}
      storedLabel={title ?? 'Current image'}
      isLoadingStored={isLoadingStored}
      onRemoveStored={handleRemoveStored}
    />
  );
};
