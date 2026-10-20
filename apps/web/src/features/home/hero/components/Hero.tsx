'use client'

import { FC } from 'react';
import { motion } from 'motion/react';
import { TripDetailsSearch } from '@/features/home/hero/components/HeroSearch/TripDetailsSearch';
import HeroImage from '@/assets/header/hero.jpg';
import Image from 'next/image';

export const Hero: FC = () => {
  return (
    <div
      id="hero-section"
      className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden pt-24 pb-12 text-white"
    >
      <div className="absolute inset-0 z-0">
        <Image
          priority
          src={HeroImage}
          placeholder="blur"
          alt="Luxury Stay Backdrop"
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover brightness-[0.6]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/40 via-gray-900/40 to-slate-50" />
      </div>

      <div className="relative z-10 mx-auto mt-6 w-full max-w-6xl px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-4"
        >
          <h1 className="font-display text-4xl leading-none font-extrabold tracking-tight drop-shadow-md sm:text-6xl">
            Your Trip Starts Here
          </h1>
          <p className="mx-auto max-w-2xl text-lg font-light text-blue-50/90 drop-shadow-sm sm:text-xl">
            Find unique stays across premium hotels, villas, and cabins. Customize your escape in
            one click.
          </p>
        </motion.div>

        <TripDetailsSearch />
      </div>
    </div>
  );
};
