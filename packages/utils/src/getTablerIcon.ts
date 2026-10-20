import * as TablerIcons from '@tabler/icons-react';
import type { ComponentType } from 'react';

type TablerIconComponent = ComponentType<{
  size?: number;
  stroke?: number;
  className?: string;
}>;

export function getTablerIcon(iconName?: string): TablerIconComponent | null {
  if (!iconName) return null;

  const icon = TablerIcons[iconName as keyof typeof TablerIcons];

  return icon as TablerIconComponent;
}
