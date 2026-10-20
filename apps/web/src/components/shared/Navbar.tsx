'use client';

import { FC, useEffect, useState } from 'react';
import { IconHeadphones, IconHeart } from '@tabler/icons-react';
import TriptoLogo from '@/assets/icons/logo.svg';
import Link from 'next/link';

type NavbarProps = {
  savedCount?: number;
};

export const Navbar: FC<NavbarProps> = ({ savedCount = 10 }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      id="tripto-navbar"
      className={`fixed font-sans top-0 right-0 left-0 z-40 py-5 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 shadow-sm backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        {/*<div*/}
        {/*  className="flex cursor-pointer items-center space-x-2"*/}
        {/*  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}*/}
        {/*>*/}
        {/*  <span className="font-display flex items-center text-3xl font-extrabold tracking-tight text-blue-600">*/}
        {/*    tripto*/}
        {/*    <span className="ml-1 inline-block h-2.5 w-2.5 animate-pulse rounded-full bg-amber-400"></span>*/}
        {/*  </span>*/}
        {/*</div>*/}
        <Link href="/" scroll>
          <TriptoLogo className="w-24" />
        </Link>

        {/* Right Navigation */}
        <div className="flex items-center space-x-3 sm:space-x-6">
          {/* Support */}
          <a
            href="#support"
            className={`flex items-center space-x-1.5 text-sm font-medium transition-colors ${
              isScrolled ? 'text-gray-600 hover:text-blue-600' : 'text-white hover:text-amber-200'
            }`}
          >
            <IconHeadphones className="h-4 w-4" />
            <span className="hidden md:inline">Support</span>
          </a>

          {/* Currency / Country */}
          {/*<div className="relative">*/}
          {/*  <button*/}
          {/*    onClick={() => setIsCurrencyDropdownOpen(!isCurrencyDropdownOpen)}*/}
          {/*    className={`flex items-center space-x-1.5 text-sm font-medium transition-colors px-2 py-1.5 rounded-lg ${*/}
          {/*      isScrolled*/}
          {/*        ? 'text-gray-600 hover:bg-gray-100 hover:text-blue-600'*/}
          {/*        : 'text-white hover:bg-white/10 hover:text-amber-200'*/}
          {/*    }`}*/}
          {/*  >*/}
          {/*    <span className="text-base">🇺🇸</span>*/}
          {/*    <span className="uppercase text-xs tracking-wider">USD</span>*/}
          {/*    <ChevronDown className="w-3 h-3" />*/}
          {/*  </button>*/}

          {/*  <AnimatePresence>*/}
          {/*    {isCurrencyDropdownOpen && (*/}
          {/*      <>*/}
          {/*        <div*/}
          {/*          className="fixed inset-0 z-10"*/}
          {/*          onClick={() => setIsCurrencyDropdownOpen(false)}*/}
          {/*        />*/}
          {/*        <motion.div*/}
          {/*          initial={{ opacity: 0, y: 10 }}*/}
          {/*          animate={{ opacity: 1, y: 0 }}*/}
          {/*          exit={{ opacity: 0, y: 10 }}*/}
          {/*          className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 p-2 z-20"*/}
          {/*        >*/}
          {/*          <div className="text-xs text-gray-400 px-3 py-1 font-semibold uppercase tracking-wider">*/}
          {/*            Select Currency*/}
          {/*          </div>*/}
          {/*          <button*/}
          {/*            onClick={() => setIsCurrencyDropdownOpen(false)}*/}
          {/*            className="w-full flex items-center justify-between px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-lg transition-colors text-left"*/}
          {/*          >*/}
          {/*            <span className="flex items-center space-x-2">*/}
          {/*              <span>🇺🇸</span>*/}
          {/*              <span>USD - US Dollar</span>*/}
          {/*            </span>*/}
          {/*            <span className="text-xs text-blue-600 font-bold">✓</span>*/}
          {/*          </button>*/}
          {/*          <button*/}
          {/*            onClick={() => setIsCurrencyDropdownOpen(false)}*/}
          {/*            className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-lg transition-colors text-left"*/}
          {/*          >*/}
          {/*            <span>🇪🇺</span>*/}
          {/*            <span>EUR - Euro</span>*/}
          {/*          </button>*/}
          {/*          <button*/}
          {/*            onClick={() => setIsCurrencyDropdownOpen(false)}*/}
          {/*            className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-lg transition-colors text-left"*/}
          {/*          >*/}
          {/*            <span>🇬🇧</span>*/}
          {/*            <span>GBP - British Pound</span>*/}
          {/*          </button>*/}
          {/*        </motion.div>*/}
          {/*      </>*/}
          {/*    )}*/}
          {/*  </AnimatePresence>*/}
          {/*</div>*/}

          {/* Saved / Favorites Drawer Toggle */}
          <button
            // onClick={onToggleSavedDrawer}
            className={`relative flex items-center space-x-2 rounded-full border px-3.5 py-1.5 transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:outline-none ${
              isScrolled
                ? 'border-rose-100 bg-rose-50 text-rose-700 hover:bg-rose-100'
                : 'border-white/10 bg-white/15 text-white hover:bg-white/25'
            }`}
            aria-label="Favorites"
          >
            <IconHeart
              className={`h-4 w-4 transition-colors ${
                savedCount > 0 ? 'animate-heartBeat fill-rose-500 text-rose-500' : 'currentColor'
              }`}
            />
            <span className="text-xs font-semibold">Favorites</span>
            <span
              className={`inline-flex h-5 min-w-[20px] items-center justify-center rounded-full px-1.5 text-[10px] font-bold ${
                savedCount > 0
                  ? isScrolled
                    ? 'bg-rose-600 text-white'
                    : 'bg-rose-500 text-white'
                  : isScrolled
                    ? 'bg-gray-200 text-gray-500'
                    : 'bg-white/20 text-white'
              }`}
            >
              {savedCount}
            </span>
          </button>

          {/* User Profile */}
          <button
            // onClick={onOpenLoyalty}
            className="relative flex items-center rounded-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border-2 border-white bg-gray-200 shadow-sm ring-2 ring-blue-100">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                alt="User Profile"
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover"
              />
            </div>
            <span className="absolute right-0 bottom-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-500" />
          </button>
        </div>
      </div>
    </header>
  );
};
