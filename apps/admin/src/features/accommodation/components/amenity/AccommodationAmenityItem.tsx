import { DynamicIcon } from '@/components/shared/DynamicIcon';
import { IconPencil, IconTrash } from '@tabler/icons-react';
import { AccommodationAmenityItemProps } from '@/features/accommodation/types/accommodationAmenity';

export const AccommodationAmenityItem = (props: AccommodationAmenityItemProps) => {
  const { item, onRemove, onEdit } = props;

  return (
    <div className="group relative flex items-center gap-3 rounded-full border border-dashed border-border bg-card px-3 py-2">
      <div className="flex items-center gap-2 text-foreground">
        <DynamicIcon name={item.icon} strokeWidth={1.6} size={20} />
        <span className="text-sm">{item.title}</span>
      </div>

      <div className="absolute -top-3 right-2 flex scale-0 items-center bg-card blur-md transition-all duration-500 group-hover:scale-100 group-hover:blur-none">
        <button
          type="button"
          onClick={onEdit}
          className="rounded-full p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          title="Edit"
        >
          <IconPencil size={14} />
        </button>
        <button
          type="button"
          onClick={onRemove}
          className="rounded-full p-1 text-muted-foreground transition-colors hover:bg-red-500/10 hover:text-red-600 dark:hover:text-red-400"
          title="Delete"
        >
          <IconTrash size={14} />
        </button>
      </div>
    </div>
  );
};
