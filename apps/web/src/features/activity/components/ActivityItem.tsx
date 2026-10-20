import React, { FC } from 'react';
import { ImagePreviewWrapper } from '@/features/document';
import { ActivityItemProps } from '@/features/activity/types/activityItem';
import { motion } from 'motion/react';

export const ActivityItem: FC<ActivityItemProps> = ({ index,activity }) => {
  const object = `${activity.id}/hero.webp`;

  return (
    <motion.li
      key={activity.id}
      layout
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group flex flex-col items-center gap-3 text-center"
    >
      <div className="relative aspect-[2/3] w-full overflow-hidden rounded-t-full bg-slate-100 shadow-sm transition-all duration-300 group-hover:shadow-md">
        <ImagePreviewWrapper
          id={activity.id}
          object={object}
          bucket="activities"
          title={activity.title}
          className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-black/5 to-transparent opacity-90" />
      </div>

      <div className="space-y-1 px-2">
        <h3 className="font-display line-clamp-2 text-sm leading-snug font-bold text-slate-800 transition-colors group-hover:text-blue-600">
          {activity.title}
        </h3>
        <p className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
          Barcelona
        </p>
      </div>
    </motion.li>
  );
};
