import FeeIcon from '@/assets/why-tripto/fee.svg';
import InstantIcon from '@/assets/why-tripto/instant.svg';
import FlexibleIcon from '@/assets/why-tripto/flexible.svg';
import { v4 as uuidv4 } from 'uuid';

export const reasons = [
  {
    id: uuidv4(),
    Icon: FeeIcon,
    title: 'No hidden fees',
    description: 'Transparent pricing with no hidden fees.',
  },
  {
    id: uuidv4(),
    Icon: InstantIcon,
    title: 'Instant booking',
    description: 'Get confirmation right after you reserve.',
  },
  {
    id: uuidv4(),
    Icon: FlexibleIcon,
    title: 'Flexibility',
    description: 'Flexible options with free cancellation on many listings.',
  },
];
