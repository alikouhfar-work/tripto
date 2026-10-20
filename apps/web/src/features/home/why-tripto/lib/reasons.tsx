import { IconCurrencyDollar, IconFileText, IconShield } from '@tabler/icons-react';

export const reasons = [
  {
    id: 1,
    title: 'No hidden fees',
    desc: 'Transparent pricing with zero hidden fees. What you see is exactly what you pay, including taxes and service charges.',
    icon: <IconCurrencyDollar className="h-6 w-6 text-blue-600" />,
    color: 'from-blue-50 to-blue-100',
    iconBg: 'bg-blue-100 border border-blue-200',
  },
  {
    id: 2,
    title: 'Instant booking',
    desc: 'Get confirmation right after you reserve. Lock in your rates instantly without waiting for host approvals.',
    icon: <IconShield className="h-6 w-6 text-indigo-600" />,
    color: 'from-indigo-50 to-indigo-100',
    iconBg: 'bg-indigo-100 border border-indigo-200',
  },
  {
    id: 3,
    title: 'Flexibility',
    desc: 'Enjoy free cancellation and easy modification options on most stays to support your changing plans.',
    icon: <IconFileText className="h-6 w-6 text-sky-600" />,
    color: 'from-sky-50 to-sky-100',
    iconBg: 'bg-sky-100 border border-sky-200',
  },
];
