import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { IconTrendingDown, IconTrendingUp, type Icon as TablerIcon } from '@tabler/icons-react';

export type StatDelta = { text: string; up: boolean };

type StatCardProps = {
  label: string;
  value: number | string;
  hint?: string;
  icon: TablerIcon;
  /** Gradient tile classes, e.g. "from-blue-500 to-indigo-500". */
  tileClassName?: string;
  /** Month-over-month pill (only passed when real trend data exists). */
  delta?: StatDelta;
};

/** Hero KPI card: gradient icon tile, big value, optional delta pill. */
export const StatCard = ({
  label,
  value,
  hint,
  icon: Icon,
  tileClassName,
  delta,
}: StatCardProps) => {
  return (
    <Card className="overflow-hidden">
      <CardContent className="px-6">
        <div className="flex items-center gap-4">
          <span
            className={cn(
              'flex size-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-white',
              tileClassName ?? 'from-blue-500 to-indigo-500',
            )}
          >
            <Icon size={26} strokeWidth={1.8} />
          </span>
          <span className="min-w-0 flex-1 truncate text-base font-semibold text-muted-foreground">
            {label}
          </span>
          {delta && (
            <span
              className={cn(
                'inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1 text-sm font-bold tabular-nums',
                delta.up
                  ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400'
                  : 'bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-400',
              )}
            >
              {delta.up ? <IconTrendingUp size={15} /> : <IconTrendingDown size={15} />}
              {delta.text}
            </span>
          )}
        </div>
        <p className="mt-4 text-[32px] leading-9 font-extrabold tabular-nums text-foreground">
          {typeof value === 'number' ? value.toLocaleString('en-US') : value}
        </p>
        {hint && <p className="mt-1.5 truncate text-sm text-muted-foreground/80">{hint}</p>}
      </CardContent>
    </Card>
  );
};

/** Thin monthly sparkline used as a StatCard bottom visual. */
export const StatSpark = ({ values, barClassName }: { values: number[]; barClassName?: string }) => {
  const max = Math.max(1, ...values);
  return (
    <div className="flex h-11 items-end gap-1" aria-hidden>
      {values.map((v, i) => (
        <span
          key={i}
          className={cn('min-w-1 flex-1 rounded-full bg-blue-500/70 dark:bg-blue-400/70', barClassName)}
          style={{ height: `${Math.max(12, (v / max) * 100)}%` }}
        />
      ))}
    </div>
  );
};

export type StatStripItem = { label: string; value: number | string; icon: TablerIcon; iconClassName?: string };

/** Compact single-card strip of secondary stats separated by dividers. */
export const StatStrip = ({ items }: { items: StatStripItem[] }) => {
  return (
    <Card>
      <CardContent className="flex flex-col divide-y divide-border p-0 sm:flex-row sm:divide-x sm:divide-y-0">
        {items.map((item) => (
          <div key={item.label} className="flex min-w-0 flex-1 items-center gap-4 px-6">
            <span
              className={cn(
                'flex size-11 shrink-0 items-center justify-center rounded-lg',
                item.iconClassName ?? 'bg-muted text-muted-foreground',
              )}
            >
              <item.icon size={20} strokeWidth={1.8} />
            </span>
            <span className="min-w-0">
              <span className="block text-xl leading-7 font-extrabold tabular-nums text-foreground">
                {typeof item.value === 'number' ? item.value.toLocaleString('en-US') : item.value}
              </span>
              <span className="block truncate text-sm text-muted-foreground">{item.label}</span>
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export type { StatCardProps };
