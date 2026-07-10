import Image from 'next/image';
import { FC, useState } from 'react';
import { ImagePreviewProps } from '../types';
import clsx from 'clsx';

export const ImagePreview: FC<ImagePreviewProps> = ({ src, alt, loading, className }) => {
  const [failed, setFailed] = useState(false);

  if (!src || failed) return;

  return (
    <div className={clsx('group relative overflow-hidden', className)}>
      <Image
        fill
        src={src}
        alt={alt}
        loading={loading}
        className="absolute h-full w-full object-cover"
        onError={() => setFailed(true)}
      />
    </div>
  );
};
