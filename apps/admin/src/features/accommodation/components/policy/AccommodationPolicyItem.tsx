import { DynamicIcon } from '@/components/shared/DynamicIcon';
import { IconPencil, IconTrash } from '@tabler/icons-react';
import { AccommodationPolicyItemProps } from '@/features/accommodation/types/accommodationPolicy';

export const AccommodationPolicyItem = (props: AccommodationPolicyItemProps) => {
  const { item, onRemove, onEdit } = props;

  return (
    <div className="group relative flex items-center gap-3 rounded-md border border-dashed border-border bg-card px-3 py-2">
      <div className="flex items-center gap-2 text-foreground">
        <DynamicIcon name={item.icon} strokeWidth={1.6} size={20} />

        <div className="flex flex-1 flex-col gap-1">
          <span className="text-sm font-medium">{item.title}</span>
          <p className="text-justify text-xs font-normal text-muted-foreground">{item.description}</p>
        </div>
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
