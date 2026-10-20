import { IconMap } from '@tabler/icons-react';
import React from 'react';

export const MapFilter = () => {
  return (
    <div className="group relative h-44 overflow-hidden rounded-2xl border border-slate-200/80">
      {/* Elegant SVG/Abstract Sea and Sand map illustration */}
      <div className="absolute inset-0 flex flex-col justify-between bg-sky-100 p-4">
        <svg
          className="absolute inset-0 h-full w-full text-slate-300 opacity-60"
          viewBox="0 0 200 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Coastal beach lines */}
          <path
            d="M-10,40 C50,30 110,60 210,40 C210,40 210,130 -10,130 Z"
            fill="#fef08a"
            opacity="0.6"
          />
          <path
            d="M-10,55 C60,45 120,70 210,55"
            stroke="#3b82f6"
            strokeWidth="1.5"
            strokeDasharray="3 3"
          />
          {/* Streets lines */}
          <line x1="30" y1="0" x2="30" y2="120" stroke="white" strokeWidth="3" />
          <line x1="80" y1="0" x2="80" y2="120" stroke="white" strokeWidth="2.5" />
          <line x1="140" y1="0" x2="140" y2="120" stroke="white" strokeWidth="3" />
          <line x1="0" y1="50" x2="200" y2="50" stroke="white" strokeWidth="4" />
          <line x1="0" y1="90" x2="200" y2="90" stroke="white" strokeWidth="2.5" />
          {/* Stays marker indicators */}
          <circle cx="45" cy="25" r="3.5" fill="#2563eb" />
          <circle cx="105" cy="70" r="3.5" fill="#2563eb" />
          <circle cx="155" cy="35" r="3.5" fill="#2563eb" />
        </svg>
        <button
          onClick={() => {
            // TODO: open map modal
          }}
          className="relative z-10 mt-auto flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-md bg-blue-600 px-4 py-3 text-xs font-bold text-white shadow-md transition-all hover:bg-blue-700 focus:outline-none active:scale-95"
        >
          <IconMap className="size-4" />
          <span>Show on Map</span>
        </button>
      </div>
    </div>
  );
};
