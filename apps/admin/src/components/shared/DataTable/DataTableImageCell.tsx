'use client';

import { FC } from 'react';
import { SafeImage } from '../SafeImage';
import { DataTableImageCellProps } from './types';
import { useGetDocument } from '@repo/documents/client';

export const DataTableImageCell: FC<DataTableImageCellProps> = (props) => {
  const {
    id,
    bucket,
    title,
    placeholderPatternUrl,
    placeholderPatternSize,
    placeholderPatternOpacity,
  } = props;
  const { data, isLoading, isError } = useGetDocument({
    id,
    bucket,
    category: 'hero',
    object: `${id}/hero.webp`,
  });

  return (
    <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-md sm:h-20 sm:w-32 sm:rounded-sm">
      <SafeImage
        fill
        alt={title}
        src={data?.url}
        isError={isError}
        isLoading={isLoading}
        placeholderPatternUrl={placeholderPatternUrl}
        placeholderPatternSize={placeholderPatternSize}
        placeholderPatternOpacity={placeholderPatternOpacity}
        sizes="(max-width: 640px) 80px, 128px"
        className="object-cover"
      />
    </div>
  );
};
