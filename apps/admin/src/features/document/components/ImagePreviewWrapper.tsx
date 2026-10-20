'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { ImagePreview } from '@/features/document/components/ImagePreview';
import { queryClient } from '@/lib/query-client';
import clsx from 'clsx';
import { FC } from 'react';
import { DOCUMENT_QUERY_KEYS, useDeleteDocument, useGetDocument } from '@repo/documents/client';
import { toast } from 'react-hot-toast';
import { ImagePreviewWrapperProps } from '@/features/document/types/document';

export const ImagePreviewWrapper: FC<ImagePreviewWrapperProps> = (props) => {
  const { id, title, bucket, object, className, category = 'hero' } = props;
  const { data, isFetching } = useGetDocument({
    id,
    bucket,
    object,
    category,
  });

  const deleteDocumentMutation = useDeleteDocument();

  if (isFetching) return <Skeleton className={clsx('rounded-lg', className || 'mb-10 size-24')} />;

  return (
    <ImagePreview
      title={title}
      src={data?.url}
      className={clsx('rounded-lg', className || 'mb-10 size-24')}
      onDelete={() => {
        toast.promise(
          deleteDocumentMutation
            .mutateAsync({
              bucket,
              object,
            })
            .then(() =>
              queryClient.removeQueries({
                queryKey: [...DOCUMENT_QUERY_KEYS.document({ id, bucket, category, object })],
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
};
