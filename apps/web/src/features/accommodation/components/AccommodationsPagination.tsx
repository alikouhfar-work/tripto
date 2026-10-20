import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import React, { FC } from 'react';
import { AccommodationsPaginationProps } from '@/features/accommodation/types/accommodations';

export const AccommodationsPagination: FC<AccommodationsPaginationProps> = ({
  skip,
  take,
  totalPages,
  currentPage,
  isNextPageDisabled,
  isPreviousPageDisabled,
  onSkipChange,
}) => {
  return (
    <div className="flex items-center justify-center space-x-1 border-t border-slate-200/80 pt-8">
      <button
        onClick={() => onSkipChange(skip - take)}
        disabled={isPreviousPageDisabled}
        className="flex size-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition-all not-disabled:cursor-pointer hover:bg-slate-50 hover:text-slate-900 focus:outline-none active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
        aria-label="Previous Page"
      >
        <IconChevronLeft className="size-5" />
      </button>

      {Array.from({ length: totalPages }).map((_, i) => {
        return (
          <button
            key={i}
            onClick={() => onSkipChange(i * take)}
            className={`size-10 cursor-pointer rounded-full font-mono text-xs font-bold transition-all focus:outline-none ${
              currentPage === i
                ? 'bg-blue-600 text-white shadow-md'
                : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            {i + 1}
          </button>
        );
      })}

      <button
        onClick={() => onSkipChange(skip + take)}
        disabled={isNextPageDisabled}
        className="flex size-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition-all not-disabled:cursor-pointer hover:bg-slate-50 hover:text-slate-900 focus:outline-none active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
        aria-label="Next Page"
      >
        <IconChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
};
