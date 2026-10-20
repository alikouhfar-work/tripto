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
} from '@/components/ui/alert-dialog';
import { deleteRoomAction } from '@/features/accommodation/hotel/room/server/commands';
import { IconLoader2, IconTrash } from '@tabler/icons-react';
import { useState, useTransition } from 'react';
import { toast } from 'react-hot-toast';

type RoomDeleteDialogProps = {
  accommodationId: string;
  roomId: string;
  roomTitle?: string;
  /** When true the hotel would be left without rooms — deletion is blocked with a toast. */
  isLastRoom?: boolean;
};

const isRedirectError = (error: unknown): boolean =>
  typeof error === 'object' &&
  error !== null &&
  'digest' in error &&
  typeof (error as { digest?: unknown }).digest === 'string' &&
  (error as { digest: string }).digest.startsWith('NEXT_REDIRECT');

/**
 * Delete action with a real confirmation modal, matching the standard
 * confirmation UX used across the application.
 */
export const RoomDeleteDialog = ({
  accommodationId,
  roomId,
  roomTitle,
  isLastRoom = false,
}: RoomDeleteDialogProps) => {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleTriggerClick = () => {
    if (isLastRoom) {
      toast.error('Cannot delete the last room. Each hotel must have at least one room.');
      return;
    }
    setOpen(true);
  };

  const handleConfirm = () => {
    startTransition(async () => {
      try {
        await deleteRoomAction(accommodationId, roomId);
        setOpen(false);
        toast.success('Room deleted successfully');
      } catch (error) {
        if (isRedirectError(error)) {
          // The action revalidated and redirected back to the rooms list.
          setOpen(false);
          toast.success('Room deleted successfully');
          return;
        }
        toast.error('Delete failed. Please try again.');
      }
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={(value) => !isPending && setOpen(value)}>
      <button
        type="button"
        onClick={handleTriggerClick}
        title="Delete"
        aria-label={roomTitle ? `Delete ${roomTitle}` : 'Delete room'}
        className="rounded-full bg-black/30 p-1 text-white backdrop-blur-md transition-colors hover:bg-red-500/80 hover:text-white"
      >
        <IconTrash size={14} />
      </button>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20">
            <IconTrash />
          </AlertDialogMedia>
          <AlertDialogTitle>Delete{roomTitle ? ` "${roomTitle}"` : ' room'}?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. The room will be permanently removed.
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
