'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { ImagePreview } from '@/features/document/components/ImagePreview';
import clsx from 'clsx';
import { FC } from 'react';
import { useGetDocument } from '@repo/documents';
import { ImagePreviewWrapperProps } from '@/features/document/types';

export const ImagePreviewWrapper: FC<ImagePreviewWrapperProps> = ({
  id,
  title,
  bucket,
  object,
  className,
  category = 'hero',
}) => {
  const { data, isFetching } = useGetDocument({
    id,
    bucket,
    object,
    category,
  });

  if (isFetching) return <Skeleton className={clsx('rounded-lg', className || 'mb-10 size-24')} />;

  return (
    <ImagePreview
      title={title}
      src={data?.url}
      className={clsx('rounded-lg', className || 'mb-10 size-24')}
    />
  );
};
