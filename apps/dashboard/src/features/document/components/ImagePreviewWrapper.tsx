'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { ImagePreview } from '@/features/document/components/ImagePreview';
import { FC } from 'react';
import { useGetDocument } from '../hooks/useGetDocument';
import { ImagePreviewWrapperProps } from '../types';

export const ImagePreviewWrapper: FC<ImagePreviewWrapperProps> = ({
  id,
  bucket,
  object,
  className,
  category = 'hero',
  ...props
}) => {
  const { data, isFetching } = useGetDocument({
    id,
    bucket,
    object,
    category,
  });

  if (isFetching) return <Skeleton className={className} />;

  return <ImagePreview {...props} src={data?.url as string} className={className} />;
};
