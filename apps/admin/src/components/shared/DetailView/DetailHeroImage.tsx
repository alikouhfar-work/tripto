'use client';

import { SafeImage } from '@/components/shared/SafeImage';
import { useGetDocument } from '@repo/documents/client';
import { cn } from '@/lib/utils';

type DetailHeroImageProps = {
  id: string;
  bucket: 'activities' | 'accommodations';
  title: string;
  object?: string;
  className?: string;
};

/**
 * Cover banner for detail views. Fetches the stored hero image client-side
 * (same `hero` category convention as DataTableImageCell/uploaders) and
 * falls back to a gradient when none is stored.
 */
export const DetailHeroImage = ({ id, bucket, title, object, className }: DetailHeroImageProps) => {
  const { data, isLoading, isError } = useGetDocument({
    id,
    bucket,
    category: 'hero',
    object: object ?? `${id}/hero.webp`,
  });

  if (isLoading) {
    return <div className={cn('h-48 w-full animate-pulse bg-muted sm:h-64', className)} />;
  }

  if (isError || !data?.url) {
    return (
      <div
        className={cn(
          'flex h-32 w-full items-center justify-center bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600 sm:h-44',
          className,
        )}
      >
        <span className="px-6 text-center text-lg font-bold text-white/90 sm:text-xl">{title}</span>
      </div>
    );
  }

  return (
    <div className={cn('relative h-48 w-full overflow-hidden sm:h-64', className)}>
      <SafeImage
        fill
        alt={title}
        src={data.url}
        sizes="(max-width: 768px) 100vw, 896px"
        className="object-cover"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
    </div>
  );
};
