import React, { FC } from 'react';
import { Globe, Heart, Send, Shield } from 'lucide-react';
import TriptoLogo from '@/assets/icons/logo.svg';
import Link from 'next/link';

export const Footer: FC = () => {
  return (
    <footer
      id="tripto-footer"
      className="relative font-sans overflow-hidden border-t border-slate-800 bg-slate-900 py-16 text-slate-300"
    >
      <div className="absolute top-1/2 left-0 h-64 w-64 -translate-y-1/2 rounded-full bg-blue-500/5 blur-3xl" />
      <div className="absolute top-1/3 right-0 h-72 w-72 -translate-y-1/2 rounded-full bg-amber-500/5 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-12">
          <div className="space-y-4 md:col-span-5">
            <Link href="/" scroll>
              <TriptoLogo className="w-24" />
            </Link>
            <p className="mt-4 max-w-sm text-xs leading-relaxed text-slate-400 sm:text-sm">
              Tripto curates the finest boutique hotels, clifftop villas, and secluded cabins to
              redefine modern getaways. Exceptional stays, transparent pricing, and unforgettable
              experiences.
            </p>
            <div className="flex items-center space-x-3.5 pt-2 text-xs text-slate-400">
              <span className="flex cursor-pointer items-center space-x-1 transition-colors hover:text-white">
                <Globe className="h-4 w-4" />
                <span>English (US)</span>
              </span>
              <span>•</span>
              <span className="flex cursor-pointer items-center space-x-1 transition-colors hover:text-white">
                <Shield className="h-4 w-4" />
                <span>Privacy & Terms</span>
              </span>
            </div>
          </div>

          <div className="space-y-4 md:col-span-3">
            <h4 className="text-xs font-bold tracking-wider text-white uppercase">Quick Escapes</h4>
            <ul className="space-y-2.5 text-xs text-slate-400 sm:text-sm">
              <li>
                <Link href="#hero-section" className="transition-colors hover:text-blue-400">
                  Stay Search Panel
                </Link>
              </li>
              <li>
                <Link
                  href="#ai-planner-section"
                  className="flex items-center space-x-1.5 transition-colors hover:text-blue-400"
                >
                  <span>AI Travel Matcher</span>
                  <span className="py-0.2 rounded bg-blue-500/20 px-1.5 text-[9px] text-blue-300">
                    New
                  </span>
                </Link>
              </li>
              <li>
                <Link href="#tripto-rewards" className="transition-colors hover:text-blue-400">
                  VIP Loyalty Rewards
                </Link>
              </li>
              <li>
                <Link href="#activities-section" className="transition-colors hover:text-blue-400">
                  Barcelona Activity Guide
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4 md:col-span-4">
            <h4 className="text-xs font-bold tracking-wider text-white uppercase">
              Join the Voyage
            </h4>
            <p className="text-xs leading-relaxed text-slate-400">
              Subscribe to unlock 15% discount promo codes, private resort listings, and exclusive
              travel updates.
            </p>

            <form className="relative mt-2 flex items-center">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-xl border border-slate-700/60 bg-slate-800 px-4 py-3 pr-10 text-xs text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
                required
              />
              <button
                type="submit"
                className="absolute right-1.5 cursor-pointer rounded-lg bg-blue-600 p-1.5 text-white transition-all hover:bg-blue-700 focus:outline-none"
                aria-label="Subscribe"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-800/80 pt-8 text-xs text-slate-500 sm:flex-row">
          <p>© {new Date().getFullYear()} Tripto Technologies Inc. All rights reserved.</p>
          <p className="flex items-center space-x-1">
            <span>Made with</span>
            <Heart className="h-3.5 w-3.5 animate-pulse fill-rose-500 text-rose-500" />
            <span>for passionate travelers.</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
