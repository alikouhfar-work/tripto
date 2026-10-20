'use client';

import { ImagePreview } from '@/features/document/components/ImagePreview';
import { queryClient } from '@/lib/query-client';
import clsx from 'clsx';
import { FC } from 'react';
import { ImagesPreviewWrapperProps } from '../types/document';
import { ImagesPreviewWrapperSkeleton } from './ImagesPreviewWrapperSkeleton';
import { DOCUMENT_QUERY_KEYS, useDeleteDocument, useGetDocuments } from '@repo/documents/client';
import { toast } from 'react-hot-toast';

export const ImagesPreviewWrapper: FC<ImagesPreviewWrapperProps> = (props) => {
  const { id, title, bucket, prefix, category = 'gallery', className, skeletonCount } = props;
  const { data, isFetching } = useGetDocuments({
    id,
    bucket,
    prefix,
    category,
  });

  const deleteDocumentMutation = useDeleteDocument();

  if (isFetching)
    return <ImagesPreviewWrapperSkeleton count={skeletonCount} className={className} />;

  return (
    <div className="flex flex-wrap items-center gap-2">
      {data?.urls?.map((src, index) => {
        const fileName = src.split('/').at(-1)?.split('?').at(0);

        return (
          <ImagePreview
            src={src}
            key={index}
            title={title}
            className={clsx('rounded-lg', className || 'mb-10 size-20')}
            onDelete={() => {
              toast.promise(
                deleteDocumentMutation
                  .mutateAsync({
                    bucket: bucket,
                    object: `${prefix}/${fileName}`,
                  })
                  .then(() =>
                    queryClient.removeQueries({
                      queryKey: [...DOCUMENT_QUERY_KEYS.documents({ id, bucket, category, prefix })],
                    }),
                  ),
                {
                  loading: 'Deleting image…',
                  success: 'Image deleted successfully',
                  error: 'Delete failed. Please try again.',
                },
              );
            }}
          />
        );
      })}
    </div>
  );
};
