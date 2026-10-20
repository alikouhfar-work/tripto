import {
  IconFlower,
  IconLeaf,
  IconSnowflake,
  IconSun,
  type Icon as TablerIcon,
} from '@tabler/icons-react';

type Season = {
  value: string;
  title: string;
  description: string;
  className: string;
  icon: TablerIcon;
};

export const SEASONS: Season[] = [
  {
    value: 'SPRING',
    title: 'Spring Picks',
    description: 'Fresh blooms and mild weather.',
    className:
      'border-emerald-600 bg-emerald-50/50 text-emerald-600 dark:border-emerald-500 dark:bg-emerald-500/10 dark:text-emerald-400',
    icon: IconFlower,
  },
  {
    value: 'SUMMER',
    title: 'Summer Hotspot',
    description: 'Perfect for sunny adventures.',
    className:
      'border-yellow-600 bg-yellow-50/50 text-yellow-600 dark:border-yellow-500 dark:bg-yellow-500/10 dark:text-yellow-400',
    icon: IconSun,
  },
  {
    value: 'AUTUMN',
    title: 'Autumn Escape',
    description: 'Cozy stays surrounded by fall colors.',
    className:
      'border-orange-600 bg-orange-50/50 text-orange-600 dark:border-orange-500 dark:bg-orange-500/10 dark:text-orange-400',
    icon: IconLeaf,
  },
  {
    value: 'WINTER',
    title: 'Winter Getaway',
    description: 'Snowy retreats and warm comfort.',
    className:
      'border-blue-600 bg-blue-50/50 text-blue-600 dark:border-blue-500 dark:bg-blue-500/10 dark:text-blue-400',
    icon: IconSnowflake,
  },
];
