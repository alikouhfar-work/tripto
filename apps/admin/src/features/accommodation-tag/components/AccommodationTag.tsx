import { AccommodationTagProps } from '@/features/accommodation-tag/types/accommodationTag';

export const AccommodationTag = ({
  title,
  emoji,
  textColor,
  borderColor,
  backgroundColor,
}: AccommodationTagProps) => {
  return (
    <div
      className="mt-2 w-fit rounded-full border px-3 py-2"
      style={{ color: textColor, borderColor, backgroundColor }}
    >
      <p className="text-sm">
        {emoji} {title}
      </p>
    </div>
  );
};
