import { FC } from 'react';
import { AccommodationTagProps } from '@/features/accommodation-tag/types';
import { clsx } from 'clsx';

export const AccommodationTag: FC<AccommodationTagProps> = ({
  title,
  emoji,
  textColor,
  className,
  borderColor,
  backgroundColor,
}) => {
  return (
    <div
      className={clsx('w-fit rounded-full border px-3 py-1.5', className)}
      style={{ color: textColor, borderColor, backgroundColor }}
    >
      <p className="text-xs">
        {emoji} {title}
      </p>
    </div>
  );
};
