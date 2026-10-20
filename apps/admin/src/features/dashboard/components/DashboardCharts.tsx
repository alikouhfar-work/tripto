import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { IconArrowUpRight } from '@tabler/icons-react';
import type { ReactNode } from 'react';

/* Pattern definitions for SVG */
const patterns = `
  <defs>
    <pattern id="diagonal-stripes" patternUnits="userSpaceOnUse" width="4" height="4">
      <path d="M0,4 l4,-4 M-4,0 l4,4 M0,-4 l4,4" stroke="currentColor" stroke-width="0.5" opacity="0.3" />
    </pattern>
    <pattern id="dots" patternUnits="userSpaceOnUse" width="6" height="6">
      <circle cx="3" cy="3" r="1" fill="currentColor" opacity="0.4" />
    </pattern>
    <pattern id="crosshatch" patternUnits="userSpaceOnUse" width="4" height="4">
      <path d="M0,4 l4,-4 M-4,0 l4,4" stroke="currentColor" stroke-width="0.5" opacity="0.2" />
    </pattern>
    <pattern id="diagonal-lines" patternUnits="userSpaceOnUse" width="8" height="8">
      <path d="M-4,0 l8,8" stroke="currentColor" stroke-width="0.8" opacity="0.25" />
    </pattern>
  </defs>
`;

/* ------------------------------------------------------------------ */
/* Monthly trend — stacked area chart (pure SVG, no chart dependency)   */
/* ------------------------------------------------------------------ */

type TrendPoint = { label: string; accommodations: number; activities: number };

export const MonthlyAreaChart = ({ data }: { data: TrendPoint[] }) => {
  const W = 720;
  const H = 190;
  const padLeft = 40;
  const padRight = 12;
  const padTop = 12;
  const padBottom = 28;
  const plotW = W - padLeft - padRight;
  const plotH = H - padTop - padBottom;
  const totals = data.map((d) => d.accommodations + d.activities);
  const max = Math.max(1, ...totals);
  // Round the axis ceiling up to a nice number.
  const ceiling = Math.max(1, Math.ceil(max / 5) * 5);
  const slot = plotW / Math.max(1, data.length);

  const x = (i: number) => padLeft + slot * i + slot / 2;
  const y = (v: number) => padTop + plotH - (v / ceiling) * plotH;
  const ticks = [0, 0.25, 0.5, 0.75, 1].map((t) => Math.round(ceiling * t));

  const line = (pick: (d: TrendPoint) => number) =>
    data.map((d, i) => `${i === 0 ? 'M' : 'L'}${x(i).toFixed(1)},${y(pick(d)).toFixed(1)}`).join(' ');
  const base = `L${x(data.length - 1).toFixed(1)},${(padTop + plotH).toFixed(1)} L${x(0).toFixed(1)},${(padTop + plotH).toFixed(1)} Z`;

  const actLine = line((d) => d.activities);
  const totalLine = data
    .map((d, i) => `${i === 0 ? 'M' : 'L'}${x(i).toFixed(1)},${y(d.activities + d.accommodations).toFixed(1)}`)
    .join(' ');

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <span className="size-2.5 rounded-sm bg-blue-500" /> Accommodations
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="size-2.5 rounded-sm bg-emerald-500" /> Activities
        </span>
        <span className="ml-auto font-semibold tabular-nums text-foreground">
          {totals.reduce((a, b) => a + b, 0).toLocaleString('en-US')} new in 6 months
        </span>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Creations per month" className="w-full">
        {patterns}
        <defs>
          <linearGradient id="areaAcc" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.45} />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.04} />
          </linearGradient>
          <linearGradient id="areaAct" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#10b981" stopOpacity={0.35} />
            <stop offset="100%" stopColor="#10b981" stopOpacity={0.04} />
          </linearGradient>
        </defs>
        {ticks.map((t) => (
          <g key={t}>
            <line
              x1={padLeft}
              x2={W - padRight}
              y1={y(t)}
              y2={y(t)}
              className="stroke-border"
              strokeWidth={1}
              strokeDasharray={t === 0 ? undefined : '4 4'}
            />
            <text x={padLeft - 8} y={y(t) + 4} textAnchor="end" fontSize={11} className="fill-muted-foreground">
              {t}
            </text>
          </g>
        ))}
        <path d={`${actLine} ${base}`} fill="url(#areaAct)" fillOpacity="0.6" />
        <path d={`${totalLine} ${base}`} fill="url(#areaAcc)" fillOpacity="0.6" />
        <path d={`${actLine} ${base}`} fill="url(#diagonal-stripes)" stroke="none" />
        <path d={`${totalLine} ${base}`} fill="url(#dots)" stroke="none" />
        <path d={actLine} fill="none" strokeWidth={2.5} className="stroke-emerald-500" strokeLinejoin="round" strokeLinecap="round" />
        <path d={totalLine} fill="none" strokeWidth={2.5} className="stroke-blue-500" strokeLinejoin="round" strokeLinecap="round" />
        {data.map((d, i) => (
          <g key={d.label}>
            <circle cx={x(i)} cy={y(d.activities + d.accommodations)} r={3.5} className="fill-blue-500 stroke-card" strokeWidth={2}>
              <title>{`${d.label}: ${d.accommodations} accommodations, ${d.activities} activities`}</title>
            </circle>
            <text x={x(i)} y={H - 10} textAnchor="middle" fontSize={12} className="fill-muted-foreground">
              {d.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Houses vs hotels — donut (pure SVG)                                 */
/* ------------------------------------------------------------------ */

export const InventoryDonutChart = ({ houses, hotels }: { houses: number; hotels: number }) => {
  const total = houses + hotels;
  const r = 72;
  const c = 2 * Math.PI * r;
  const houseFrac = total === 0 ? 0 : houses / total;
  const hotelFrac = total === 0 ? 0 : hotels / total;

  return (
    <div className="flex h-full min-h-64 w-full flex-1 flex-col justify-center gap-5">
      <svg viewBox="0 0 200 200" role="img" aria-label={`${houses} houses, ${hotels} hotels`} className="mx-auto w-full max-w-56 flex-1 shrink-0">
        {patterns}
        <defs>
          <linearGradient id="donutHouse" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0ea5e9" />
            <stop offset="50%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#2563eb" />
          </linearGradient>
          <linearGradient id="donutHotel" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f472b6" />
            <stop offset="50%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#7c3aed" />
          </linearGradient>
          <radialGradient id="donutGlowHouse" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="donutGlowHotel" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f472b6" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#f472b6" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx={100} cy={100} r={r} fill="none" strokeWidth={24} className="stroke-muted" />
        {hotels > 0 && (
          <>
            <circle
              cx={100}
              cy={100}
              r={r - 2}
              fill="none"
              strokeWidth={20}
              strokeLinecap="round"
              stroke="url(#donutHotel)"
              strokeDasharray={`${c} ${c}`}
              transform="rotate(-90 100 100)"
            >
              <title>{`${hotels} hotels`}</title>
            </circle>
            <circle
              cx={100}
              cy={100}
              r={r - 2}
              fill="none"
              strokeWidth={20}
              strokeLinecap="round"
              stroke="url(#diagonal-lines)"
              strokeDasharray={`${hotelFrac * c} ${c}`}
              transform="rotate(-90 100 100)"
              opacity="0.3"
            />
            <circle
              cx={100}
              cy={100}
              r={r + 24}
              fill="none"
              strokeWidth={8}
              stroke="url(#donutGlowHotel)"
              strokeDasharray={`${hotelFrac * c} ${c}`}
              transform="rotate(-90 100 100)"
              opacity="0.4"
            />
          </>
        )}
        {houses > 0 && (
          <>
            <circle
              cx={100}
              cy={100}
              r={r}
              fill="none"
              strokeWidth={24}
              strokeLinecap="round"
              stroke="url(#donutHouse)"
              strokeDasharray={`${houseFrac * c} ${c}`}
              transform="rotate(-90 100 100)"
            >
              <title>{`${houses} houses`}</title>
            </circle>
            <circle
              cx={100}
              cy={100}
              r={r}
              fill="none"
              strokeWidth={24}
              strokeLinecap="round"
              stroke="url(#diagonal-stripes)"
              strokeDasharray={`${houseFrac * c} ${c}`}
              transform="rotate(-90 100 100)"
              opacity="0.3"
            />
            <circle
              cx={100}
              cy={100}
              r={r + 24}
              fill="none"
              strokeWidth={8}
              stroke="url(#donutGlowHouse)"
              strokeDasharray={`${houseFrac * c} ${c}`}
              transform="rotate(-90 100 100)"
              opacity="0.4"
            />
          </>
        )}
        <text x={100} y={94} textAnchor="middle" fontSize={28} fontWeight={800} className="fill-foreground">
          {total.toLocaleString('en-US')}
        </text>
        <text x={100} y={116} textAnchor="middle" fontSize={12} className="fill-muted-foreground">
          listings
        </text>
      </svg>
      <ul className="grid w-full grid-cols-2 gap-2">
        <li className="flex items-center gap-2.5 rounded-xl bg-sky-500/10 px-3 py-2.5">
          <span className="size-3 shrink-0 rounded-full bg-gradient-to-br from-sky-400 to-blue-600" />
          <span className="min-w-0 flex-1">
            <span className="block text-sm font-bold tabular-nums text-foreground">
              {houses.toLocaleString('en-US')}
            </span>
            <span className="block truncate text-xs text-muted-foreground">
              Houses{total > 0 && ` · ${Math.round(houseFrac * 100)}%`}
            </span>
          </span>
        </li>
        <li className="flex items-center gap-2.5 rounded-xl bg-fuchsia-500/10 px-3 py-2.5">
          <span className="size-3 shrink-0 rounded-full bg-gradient-to-br from-pink-400 to-violet-600" />
          <span className="min-w-0 flex-1">
            <span className="block text-sm font-bold tabular-nums text-foreground">
              {hotels.toLocaleString('en-US')}
            </span>
            <span className="block truncate text-xs text-muted-foreground">
              Hotels{total > 0 && ` · ${Math.round(hotelFrac * 100)}%`}
            </span>
          </span>
        </li>
      </ul>
    </div>
  )
}
/* Ranked horizontal bars                                              */
/* ------------------------------------------------------------------ */

export type RankedItem = { label: string; sub?: string; count: number };

const rankBadgeClass = (rank: number): string => {
  if (rank === 0) return 'bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400';
  if (rank === 1) return 'bg-slate-200 text-slate-600 dark:bg-slate-500/15 dark:text-slate-300';
  if (rank === 2) return 'bg-orange-100 text-orange-700 dark:bg-orange-500/15 dark:text-orange-400';
  return 'bg-muted text-muted-foreground';
};

const rankGradientClass = (rank: number): string => {
  if (rank === 0) return 'from-amber-500 to-orange-500 dark:from-amber-400 dark:to-orange-400';
  if (rank === 1) return 'from-slate-500 to-slate-400 dark:from-slate-400 dark:to-slate-500';
  if (rank === 2) return 'from-orange-500 to-amber-500 dark:from-orange-400 dark:to-amber-400';
  return 'from-blue-600 to-sky-400 dark:from-blue-500 dark:to-sky-400';
};

export const RankedBars = ({ items }: { items: RankedItem[] }) => {
  const max = Math.max(1, ...items.map((i) => i.count));
  const total = items.reduce((sum, i) => sum + i.count, 0);
  if (!items.length) {
    return <p className="py-6 text-center text-sm text-muted-foreground">No data yet.</p>;
  }
  return (
    <ul className="space-y-1">
      {items.map((item, i) => (
        <li
          key={item.label}
          className="rounded-xl px-2 py-2 transition-colors hover:bg-muted/60"
        >
          <div className="mb-1.5 flex items-center gap-2.5 text-sm">
            <span
              className={`flex size-6 shrink-0 items-center justify-center rounded-md text-xs font-bold tabular-nums ${rankBadgeClass(i)}`}
            >
              {i + 1}
            </span>
            <span className="min-w-0 flex-1 truncate font-medium text-foreground">
              {item.label}
              {item.sub && <span className="ml-1.5 font-normal text-muted-foreground">{item.sub}</span>}
            </span>
            <span className="shrink-0 text-xs tabular-nums text-muted-foreground">
              {total === 0 ? '' : `${Math.round((item.count / total) * 100)}%`}
            </span>
            <span className="shrink-0 font-bold tabular-nums text-foreground">{item.count}</span>
          </div>
          <div className="ml-[34px] h-3 overflow-hidden rounded-full bg-muted relative">
            <div
              className={`h-full rounded-full ${rankGradientClass(i)}`}
              style={{ width: `${Math.max(4, (item.count / max) * 100)}%` }}
            />
            <div
              className="absolute inset-0 h-full rounded-full opacity-30"
              style={{
                backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'4\' height=\'4\'%3E%3Cpath d=\'M0,4 l4,-4 M-4,0 l4,4 M0,-4 l4,4\' stroke=\'white\' stroke-width=\'0.5\' opacity=\'0.3\'/%3E%3C/svg%3E")',
                backgroundSize: '4px 4px',
              }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
};

/* ------------------------------------------------------------------ */
/* Recent-items link list                                              */
/* ------------------------------------------------------------------ */

export type RecentItem = { id: string; href: string; title: string; meta: string };

export const RecentList = ({
  items,
  emptyText,
  icon,
  iconClassName,
}: {
  items: RecentItem[];
  emptyText: string;
  icon?: ReactNode;
  iconClassName?: string;
}) => {
  if (!items.length) {
    return <p className="py-6 text-center text-sm text-muted-foreground">{emptyText}</p>;
  }
  return (
    <ul className="divide-y divide-border">
      {items.map((item) => (
        <li key={item.id}>
          <Link
            href={item.href}
            className="group -mx-2 flex items-center gap-3.5 rounded-xl px-2 py-3.5 transition-colors first:-mt-2 hover:bg-muted/60 last:-mb-2"
          >
            {icon && (
              <span
                className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${iconClassName ?? 'bg-muted text-muted-foreground'}`}
              >
                {icon}
              </span>
            )}
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-semibold text-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400">
                {item.title}
              </span>
              <span className="mt-0.5 block truncate text-xs text-muted-foreground">{item.meta}</span>
            </span>
            <IconArrowUpRight
              size={16}
              className="shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        </li>
      ))}
    </ul>
  );
};

/* ------------------------------------------------------------------ */
/* Section card wrapper                                                */
/* ------------------------------------------------------------------ */

export const DashboardSection = ({
  title,
  description,
  actionHref,
  actionLabel,
  children,
  className,
}: {
  title: string;
  description?: string;
  actionHref?: string;
  actionLabel?: string;
  children: ReactNode;
  className?: string;
}) => (
  <Card className={className ? `flex h-full flex-col ${className}` : 'flex h-full flex-col'}>
    <CardHeader className="flex flex-row items-start justify-between gap-2">
      <span>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription className="mt-1">{description}</CardDescription>}
      </span>
      {actionHref && (
        <Link
          href={actionHref}
          className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
        >
          {actionLabel ?? 'View all'}
          <IconArrowUpRight size={15} />
        </Link>
      )}
    </CardHeader>
    <CardContent className="flex flex-1 flex-col">{children}</CardContent>
  </Card>
);
