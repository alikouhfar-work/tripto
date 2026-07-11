'use client';

import { DataTableColumnHeader } from '@/components/shared/DataTable';
import { ColumnDef } from '@tanstack/react-table';
import { CheckIcon, XIcon } from 'lucide-react';
import { AccommodationTag } from '../types/accommodationTag';

export const accommodationTagListColumns: ColumnDef<AccommodationTag>[] = [
  {
    accessorKey: 'title',
    size: 10000,
    header: ({ column }) => <DataTableColumnHeader column={column} title="Title" />,
  },
  {
    size: 5000,
    enableSorting: false,
    accessorKey: 'textColor',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Color Tokens" />,
    cell: ({ row }) => {
      const { textColor, borderColor, backgroundColor } = row.original;

      return (
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2">
            <div
              className="group/tool relative size-8 shrink-0 rounded-full border-2 border-white shadow-sm dark:border-zinc-600"
              style={{ backgroundColor: backgroundColor }}
              title={`Background: ${backgroundColor}`}
            />
            <div
              className="group/tool relative size-8 shrink-0 rounded-full border-2 border-white shadow-sm dark:border-zinc-600"
              style={{ backgroundColor: borderColor }}
              title={`Border: ${borderColor}`}
            />
            <div
              className="group/tool relative size-8 shrink-0 rounded-full border-2 border-white shadow-sm dark:border-zinc-600"
              style={{ backgroundColor: textColor }}
              title={`Text: ${textColor}`}
            />
          </div>
          <div className="flex flex-wrap gap-1">
            <div className="flex items-center gap-1 rounded-md border border-zinc-200/75 bg-zinc-50 px-1.75 py-1 dark:border-zinc-700 dark:bg-zinc-800">
              <span
                className="size-3 rounded-full border border-black/5"
                style={{ backgroundColor: backgroundColor }}
              />
              <span className="font-mono text-[10px] font-semibold text-zinc-500">Background:</span>
              <span className="font-mono text-[10px] text-zinc-800 uppercase dark:text-zinc-300">
                {backgroundColor}
              </span>
            </div>

            <div className="flex items-center gap-1 rounded-md border border-zinc-200/75 bg-zinc-50 px-1.75 py-1 dark:border-zinc-700 dark:bg-zinc-800">
              <span
                className="size-3 rounded-full border border-black/5"
                style={{ backgroundColor: borderColor }}
              />
              <span className="font-mono text-[10px] font-semibold text-zinc-500">Border:</span>
              <span className="font-mono text-[10px] text-zinc-800 uppercase dark:text-zinc-300">
                {borderColor}
              </span>
            </div>

            <div className="flex items-center gap-1 rounded-md border border-zinc-200/75 bg-zinc-50 px-1.75 py-1 dark:border-zinc-700 dark:bg-zinc-800">
              <span
                className="size-3 rounded-full border border-black/5"
                style={{ backgroundColor: textColor }}
              />
              <span className="font-mono text-[10px] font-semibold text-zinc-500">Text:</span>
              <span className="font-mono text-[10px] text-zinc-800 uppercase dark:text-zinc-300">
                {textColor}
              </span>
            </div>
          </div>
        </div>
      );
    },
  },
  {
    size: 100,
    accessorKey: 'emoji',
    enableSorting: false,
    header: ({ column }) => <DataTableColumnHeader column={column} title="Emoji" />,
    cell: ({ row }) => {
      const { emoji } = row.original;

      return <p className="text-center text-lg">{emoji}</p>;
    },
  },
  {
    accessorKey: 'isActive',
    size: 100,
    enableSorting: false,
    header: ({ column }) => <DataTableColumnHeader column={column} title="Active" />,
    cell: (row) => {
      const isActive = row.getValue();

      return (
        <>
          {isActive ? (
            <CheckIcon size={20} className="mx-auto text-green-600" />
          ) : (
            <XIcon size={20} className="mx-auto text-red-600" />
          )}
        </>
      );
    },
  },
];
