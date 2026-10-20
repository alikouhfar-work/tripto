import { FC } from 'react';
import { IconCheck, IconCopy, IconShield, IconTicket } from '@tabler/icons-react';

export const Promos: FC = () => {
  const copiedPromoId = 'p2'

  return (
    <section
      id="travel-more-promo"
      className="space-y-8 rounded-3xl border border-slate-100 bg-white p-6 py-12 shadow-xs sm:p-10"
    >
      <div className="flex flex-col items-start justify-between gap-6 border-b border-slate-100 pb-6 md:flex-row md:items-center">
        <div className="space-y-1">
          <span className="flex items-center space-x-1 font-mono text-xs font-extrabold tracking-widest text-blue-600 uppercase">
            <IconTicket className="h-3.5 w-3.5" />
            <span>Rewards Sandbox</span>
          </span>
          <h2 className="font-display text-xl font-black tracking-tight text-slate-800 sm:text-2xl">
            Travel More, Spend Less
          </h2>
          <p className="text-xs font-medium text-slate-400">
            Activate member vouchers to slice your expenses. Click to copy and paste at checkout!
          </p>
        </div>
        <div className="flex shrink-0 items-center space-x-1.5 rounded-xl border border-slate-100 bg-slate-50 px-3.5 py-2 text-xs font-medium text-slate-500">
          <IconShield className="h-4 w-4 text-emerald-500" />
          <span>Verifiable Member Deals Only</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="group flex flex-col justify-between space-y-4 rounded-2xl border border-slate-100 bg-slate-50 p-5 transition-colors hover:bg-slate-100/50">
          <div className="space-y-1">
            <span className="rounded-md bg-blue-100/60 px-2 py-0.5 font-mono text-[10px] font-bold text-blue-600 uppercase">
              Welcome Pack
            </span>
            <h3 className="font-display text-base leading-snug font-bold text-slate-800">
              First-Time Explorer
            </h3>
            <p className="text-xs text-slate-400">
              Save $50 flat on any stay exceeding 2 nights booked before next month.
            </p>
          </div>
          <div className="flex items-center justify-between rounded-xl border border-slate-200/60 bg-white p-2">
            <span className="font-mono text-xs font-extrabold tracking-wider text-slate-800">
              EXPLORE50
            </span>
            <button
              type="button"
              // onClick={() => handleCopyPromo('EXPLORE50', 'p1')}
              className="flex items-center space-x-1 text-xs font-bold text-blue-600 hover:text-blue-700 focus:outline-none"
            >
              {copiedPromoId === 'p1' ? (
                <>
                  <IconCheck className="h-3.5 w-3.5 text-emerald-500" />
                  <span className="text-[11px] text-emerald-600">Copied!</span>
                </>
              ) : (
                <>
                  <IconCopy className="h-3.5 w-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Promo 2 */}
        <div className="group flex flex-col justify-between space-y-4 rounded-2xl border border-slate-100 bg-slate-50 p-5 transition-colors hover:bg-slate-100/50">
          <div className="space-y-1">
            <span className="rounded-md bg-amber-100/60 px-2 py-0.5 font-mono text-[10px] font-bold text-amber-600 uppercase">
              VIP Treat
            </span>
            <h3 className="font-display text-base leading-snug font-bold text-slate-800">
              Romantic Getaway Package
            </h3>
            <p className="text-xs text-slate-400">
              Complimentary champagne, fruit platters and massage on selected honeymoon stays.
            </p>
          </div>
          <div className="flex items-center justify-between rounded-xl border border-slate-200/60 bg-white p-2">
            <span className="font-mono text-xs font-extrabold tracking-wider text-slate-800">
              ROMANCEVIP
            </span>
            <button
              type="button"
              // onClick={() => handleCopyPromo('ROMANCEVIP', 'p2')}
              className="flex items-center space-x-1 text-xs font-bold text-blue-600 hover:text-blue-700 focus:outline-none"
            >
              {copiedPromoId === 'p2' ? (
                <>
                  <IconCheck className="h-3.5 w-3.5 text-emerald-500" />
                  <span className="text-[11px] text-emerald-600">Copied!</span>
                </>
              ) : (
                <>
                  <IconCopy className="h-3.5 w-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Promo 3 */}
        <div className="group flex flex-col justify-between space-y-4 rounded-2xl border border-slate-100 bg-slate-50 p-5 transition-colors hover:bg-slate-100/50">
          <div className="space-y-1">
            <span className="rounded-md bg-emerald-100/60 px-2 py-0.5 font-mono text-[10px] font-bold text-emerald-600 uppercase">
              Nature Lover
            </span>
            <h3 className="font-display text-base leading-snug font-bold text-slate-800">
              Cozy Cabin Hamper
            </h3>
            <p className="text-xs text-slate-400">
              Complimentary local wine and gourmet fireplace barbecue pack in woodland timber huts.
            </p>
          </div>
          <div className="flex items-center justify-between rounded-xl border border-slate-200/60 bg-white p-2">
            <span className="font-mono text-xs font-extrabold tracking-wider text-slate-800">
              CABINLOVE
            </span>
            <button
              type="button"
              // onClick={() => handleCopyPromo('CABINLOVE', 'p3')}
              className="flex items-center space-x-1 text-xs font-bold text-blue-600 hover:text-blue-700 focus:outline-none"
            >
              {copiedPromoId === 'p3' ? (
                <>
                  <IconCheck className="h-3.5 w-3.5 text-emerald-500" />
                  <span className="text-[11px] text-emerald-600">Copied!</span>
                </>
              ) : (
                <>
                  <IconCopy className="h-3.5 w-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
