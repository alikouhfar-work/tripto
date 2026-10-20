'use client';

import { FC } from 'react';
import { reasons } from '../lib/reasons';
import { motion } from 'motion/react';

export const WhyTripto: FC = () => {
  return (
    <section id="why-trust-us" className="relative overflow-hidden bg-slate-50 py-20">
      {/* Curved background line decoration */}
      <div className="pointer-events-none absolute inset-0 z-0 hidden opacity-25 md:block">
        <svg
          className="h-full w-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 400"
          fill="none"
        >
          <path
            d="M 150 200 Q 450 100, 750 250 T 1050 150"
            stroke="url(#gradient-line)"
            strokeWidth="3"
            strokeDasharray="10 10"
          />
          <defs>
            <linearGradient id="gradient-line" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="50%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#0ea5e9" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Why Travellers Trust Tripto
            </h2>
            <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-blue-600" />
            <p className="mt-4 text-base text-slate-500">
              We focus on premium standards, transparent operations, and extreme comfort to deliver
              unforgettable stays.
            </p>
          </motion.div>
        </div>

        <div className="relative grid grid-cols-1 gap-8 md:grid-cols-3">
          {reasons.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-8 shadow-xs transition-all duration-300 hover:shadow-xl"
            >
              {/* Decorative corner accent */}
              <div className="absolute top-0 right-0 h-24 w-24 rounded-bl-full bg-gradient-to-br opacity-5 transition-opacity group-hover:opacity-10" />

              <div className="flex flex-col items-center text-center">
                {/* Icon Container */}
                <div
                  className={`h-14 w-14 ${step.iconBg} mb-6 flex items-center justify-center rounded-2xl shadow-xs transition-transform duration-500 group-hover:rotate-6`}
                >
                  {step.icon}
                </div>

                <h3 className="font-display mb-3 text-lg font-extrabold tracking-tight text-slate-800 transition-colors group-hover:text-blue-600">
                  {step.title}
                </h3>

                <p className="text-sm leading-relaxed text-slate-500">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
