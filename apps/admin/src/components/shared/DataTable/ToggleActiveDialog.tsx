'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { IconLoader2, IconPower } from '@tabler/icons-react';
import { useState, useTransition, type ReactNode } from 'react';
import { toast } from 'react-hot-toast';

type ToggleActiveDialogProps = {
  /** Bound server action, e.g. `toggleActiveAction.bind(null, row.id)`. */
  action: () => Promise<unknown>;
  /** Current active state of the row — drives the confirm copy. */
  isActive: boolean;
  /** Human-readable label used inside the confirmation copy. */
  itemLabel?: string;
  children: ReactNode;
};

/**
 * Active/inactive toggle with a real confirmation modal.
 * The server action only runs after the user confirms in the dialog.
 * Shows a pending state on the confirm button while the action runs.
 */
export const ToggleActiveDialog = ({
  action,
  isActive,
  itemLabel,
  children,
}: ToggleActiveDialogProps) => {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const verb = isActive ? 'Deactivate' : 'Activate';

  const handleConfirm = () => {
    startTransition(async () => {
      try {
        await action();
        setOpen(false);
        toast.success(`${verb}d successfully`);
      } catch {
        toast.error(`${verb} failed. Please try again.`);
      }
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={(value) => !isPending && setOpen(value)}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia
            className={
              isActive
                ? 'bg-amber-500/10 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400'
                : 'bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400'
            }
          >
            <IconPower />
          </AlertDialogMedia>
          <AlertDialogTitle>
            {verb}
            {itemLabel ? ` ${itemLabel}` : ' item'}?
          </AlertDialogTitle>
          <AlertDialogDescription>
            {isActive
              ? 'The record will be hidden across the platform until reactivated.'
              : 'The record will become visible across the platform again.'}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            variant={isActive ? 'destructive' : 'default'}
            onClick={handleConfirm}
            disabled={isPending}
          >
            <span className="inline-flex items-center gap-1.5">
              {isPending && <IconLoader2 size={16} className="animate-spin" />}
              {isPending ? `${verb.slice(0, -1)}ing…` : verb}
            </span>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
