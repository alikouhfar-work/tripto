'use client';

import Image from 'next/image';
import { FC, useState } from 'react';
import { ImagePreviewProps } from '../types';
import clsx from 'clsx';

export const ImagePreview: FC<ImagePreviewProps> = ({ src, title = '', className }) => {
  const [failed, setFailed] = useState(false);

  const shouldRenderImage = !!src && !failed;

  return (
    <div className={clsx('group relative overflow-hidden bg-zinc-50', className)}>
      {shouldRenderImage && (
        <Image
          fill
          src={src}
          alt={title}
          className="object-cover"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
};
