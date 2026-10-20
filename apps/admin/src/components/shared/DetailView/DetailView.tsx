import Link from 'next/link';
import type { ReactNode } from 'react';
import { IconArrowLeft, IconPencil } from '@tabler/icons-react';
import { Card, CardContent } from '@/components/ui/card';

export type DetailViewRow = {
  label: string;
  value: ReactNode;
  /** Optional leading icon rendered next to the label. */
  icon?: ReactNode;
};

type DetailViewProps = {
  title: ReactNode;
  description?: ReactNode;
  rows: DetailViewRow[];
  backHref: string;
  backLabel: string;
  editHref?: string;
  /** Optional cover/banner rendered at the top of the header card. */
  hero?: ReactNode;
  /** Optional status pills rendered under the title (type, active, counts...). */
  badges?: ReactNode;
};

/**
 * Readonly entity detail layout used by `/{entity}/{id}` view routes.
 * Header card (optional hero, title, badges, actions) + definition-list Card.
 * Dark-mode ready (theme tokens only, no hardcoded zinc surfaces).
 */
export const DetailView = ({
  title,
  description,
  rows,
  backHref,
  backLabel,
  editHref,
  hero,
  badges,
}: DetailViewProps) => {
  return (
    <div className="mx-auto w-full max-w-4xl">
      <Link
        href={backHref}
        className="mb-5 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <IconArrowLeft size={16} />
        Back to {backLabel}
      </Link>

      <Card className="mb-6 overflow-hidden py-0">
        {hero}
        <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <h3 className="text-2xl font-extrabold break-words text-foreground sm:text-3xl">
              {title}
            </h3>
            {description && (
              <p className="mt-1.5 text-sm text-muted-foreground">{description}</p>
            )}
            {badges && <div className="mt-3 flex flex-wrap items-center gap-1.5">{badges}</div>}
          </div>
          {editHref && (
            <Link
              href={editHref}
              className="inline-flex h-10 shrink-0 items-center gap-1.5 self-start rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-700 sm:self-auto dark:bg-blue-600 dark:hover:bg-blue-500"
            >
              <IconPencil size={16} />
              Edit
            </Link>
          )}
        </div>
      </Card>

      <Card>
        <CardContent className="p-0">
          <dl className="divide-y divide-border">
            {rows.map((row) => (
              <div
                key={row.label}
                className="grid grid-cols-1 gap-1.5 px-6 py-4 transition-colors hover:bg-muted/30 sm:grid-cols-[220px_1fr] sm:gap-4"
              >
                <dt className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                  {row.label}
                </dt>
                <dd className="min-w-0 text-sm leading-relaxed break-words text-foreground">
                  {row.value}
                </dd>
              </div>
            ))}
          </dl>
        </CardContent>
      </Card>
    </div>
  );
};
