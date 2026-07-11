import { FC } from 'react';
import { AccommodationTagProps } from '@/features/accommodation/accommodation-tag/types';

export const AccommodationTag: FC<AccommodationTagProps> = ({
  title,
  emoji,
  textColor,
  borderColor,
  backgroundColor,
}) => {
  return (
    <div
      className="mt-2 w-fit rounded-full border px-3 py-1.5"
      style={{ color: textColor, borderColor, backgroundColor }}
    >
      <p className="text-xs">
        {emoji} {title}
      </p>
    </div>
  );
};
