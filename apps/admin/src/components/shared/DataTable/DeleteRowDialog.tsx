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
import { IconLoader2, IconTrash } from '@tabler/icons-react';
import { useState, useTransition, type ReactNode } from 'react';
import { toast } from 'react-hot-toast';

type DeleteRowDialogProps = {
  /** Bound server action, e.g. `deleteAction.bind(null, row.id)`. */
  action: () => Promise<unknown>;
  /** Human-readable label used inside the confirmation copy. */
  itemLabel?: string;
  children: ReactNode;
};

/**
 * Delete action with a real confirmation modal.
 * The server action only runs after the user confirms in the dialog.
 * Shows a pending state on the confirm button while the action runs.
 */
export const DeleteRowDialog = ({ action, itemLabel, children }: DeleteRowDialogProps) => {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleConfirm = () => {
    startTransition(async () => {
      try {
        await action();
        setOpen(false);
        toast.success('Deleted successfully');
      } catch {
        toast.error('Delete failed. Please try again.');
      }
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={(value) => !isPending && setOpen(value)}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20">
            <IconTrash />
          </AlertDialogMedia>
          <AlertDialogTitle>Delete{itemLabel ? ` ${itemLabel}` : ' item'}?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. The record will be permanently removed.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
          <AlertDialogAction variant="destructive" onClick={handleConfirm} disabled={isPending}>
            <span className="inline-flex items-center gap-1.5">
              {isPending && <IconLoader2 size={16} className="animate-spin" />}
              {isPending ? 'Deleting…' : 'Delete'}
            </span>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
