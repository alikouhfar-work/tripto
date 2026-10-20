'use client';

import { motion } from 'framer-motion';
import { FC, useState } from 'react';
import { propertyTypes } from '../../lib/propertyTypes';

export const PropertyTypeSearch: FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="mx-auto mt-12 mb-4 w-full space-y-4"
    >
      <ul className="flex scrollbar-none items-center justify-start space-x-1.5 overflow-x-auto pb-1 sm:pb-0 md:justify-center">
        {propertyTypes.map((propertyType, index) => {
          const isActive = currentIndex === index;
          return (
            <li
              key={propertyType.id}
              onClick={() => setCurrentIndex(index)}
              className={`flex shrink-0 cursor-pointer items-center space-x-2 rounded-xl px-4 py-2.5 text-xs font-semibold transition-all focus:outline-none sm:text-sm ${
                isActive
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25'
                  : 'bg-white/10 text-white hover:bg-white/20 hover:text-white'
              }`}
            >
              <span>{propertyType.icon}</span>
              <span>{propertyType.label}</span>
            </li>
          );
        })}
      </ul>
    </motion.div>
  );
};
