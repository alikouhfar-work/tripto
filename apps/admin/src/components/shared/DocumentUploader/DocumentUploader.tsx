'use client';

import { Button } from '@/components/ui/button';
import { IconCloudUpload, IconX } from '@tabler/icons-react';
import { ImageIcon } from 'lucide-react';
import { FC, useEffect, useMemo, useRef, useState } from 'react';
import { DocumentUploaderProps, PreviewItem } from './types';
import clsx from 'clsx';

export const DocumentUploader: FC<DocumentUploaderProps> = (props) => {
  const { ref, value, onChange, multiple = false } = props;
  const heroImageInputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/webp', 'image/avif'] as const;

  const files = useMemo<File[]>(() => {
    if (!value) return [];
    if (Array.isArray(value)) return value;
    return value instanceof File ? [value] : [];
  }, [value]);

  const previews = useMemo<PreviewItem[]>(() => {
    return files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
  }, [files]);

  useEffect(() => {
    return () => {
      previews.forEach((item) => URL.revokeObjectURL(item.url));
    };
  }, [previews]);

  const normalizeFiles = (incomingFiles: File[]) => {
    return incomingFiles.filter((file) =>
      ALLOWED_TYPES.includes(file.type as (typeof ALLOWED_TYPES)[number]),
    );
  };

  const handleFiles = (incomingFiles: File[]) => {
    const validFiles = normalizeFiles(incomingFiles);

    if (!validFiles.length) return;

    if (multiple) {
      const mergedFiles = [...files, ...validFiles];
      onChange(mergedFiles);
    } else {
      onChange(validFiles[0] ?? null);
    }
  };

  const handleClick = () => heroImageInputRef.current?.click();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files ?? []);
    handleFiles(selectedFiles);
    e.target.value = '';
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files ?? []);
    handleFiles(droppedFiles);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleRemove = (index: number) => {
    if (multiple) {
      const updatedFiles = files.filter((_, i) => i !== index);
      onChange(updatedFiles);
      return;
    }

    onChange(null);
  };

  return (
    <div>
      <div
        onClick={handleClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={clsx(
          'group flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border border-dashed px-6 py-8 text-center transition-colors outline-none',
          isDragging
            ? 'border-blue-500 bg-blue-50/70 dark:bg-blue-500/10'
            : 'border-border bg-muted/30 hover:border-blue-400 hover:bg-muted/60',
          'focus-visible:border-blue-500 focus-visible:ring-[3px] focus-visible:ring-blue-500/40',
        )}
      >
        <div className="flex flex-wrap items-center justify-center gap-3">
          {previews.length > 0 ? (
            previews.map((item, index) => (
              <div
                key={`${item.file.name}-${index}`}
                className={clsx(
                  'relative overflow-hidden bg-muted',
                  multiple ? 'size-12 rounded-lg lg:size-16' : 'size-24 rounded-xl',
                )}
              >
                <img src={item.url} alt={item.file.name} className="h-full w-full object-cover" />

                <Button
                  size="xs"
                  color="red"
                  variant="outline"
                  className="absolute top-1 right-1 size-5 rounded-full bg-white p-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove(index);
                  }}
                >
                  <IconX size={10} strokeWidth={3} />
                </Button>
              </div>
            ))
          ) : (
            <span className="flex size-12 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400">
              {isDragging ? <IconCloudUpload size={22} /> : <ImageIcon size={22} />}
            </span>
          )}
        </div>

        <div className="text-center">
          <p className="text-sm font-medium text-foreground">
            {previews.length > 0
              ? 'Click to add more or drag and drop'
              : 'Click to upload or drag and drop'}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">PNG, JPG, AVIF or WEBP (max 5MB)</p>

          {files.length > 0 && (
            <ul className="mt-3 flex flex-wrap justify-center gap-x-1.5 gap-y-2">
              {files.map((file, index) => (
                <li
                  key={`${file.name}-${index}`}
                  className="rounded-full border border-blue-500/30 px-2 py-0.5 text-xs text-blue-600 dark:text-blue-400"
                >
                  {file.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <input
        ref={(el) => {
          heroImageInputRef.current = el;
          ref(el);
        }}
        type="file"
        className="hidden"
        multiple={multiple}
        onChange={handleChange}
        accept={ALLOWED_TYPES.join(',')}
      />
    </div>
  );
};
