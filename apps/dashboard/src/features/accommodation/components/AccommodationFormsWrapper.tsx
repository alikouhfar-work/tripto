'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { IconBuilding, IconHome } from '@tabler/icons-react';
import { type FC, Fragment } from 'react';
import { HotelForm } from '../hotel/components/HotelForm';
import { HouseForm } from '../house/components/HouseForm';
import { AccommodationFormsWrapperProps } from '../types/accommodation';
import { clsx } from 'clsx';
import { ModificationFormTitle } from '@/components/shared/ModificationForm/ModificationFormTitle';

export const AccommodationFormsWrapper: FC<AccommodationFormsWrapperProps> = ({ initialData }) => {
  const isEditMode = Boolean(initialData?.id);
  const activeTab = isEditMode ? (initialData?.house ? 'HOUSE' : 'HOTEL') : 'HOUSE';

  const tabs = [
    {
      name: 'House',
      value: 'HOUSE',
      icon: IconHome,
      content: <HouseForm initialData={initialData} />,
    },
    {
      name: 'Hotel',
      value: 'HOTEL',
      icon: IconBuilding,
      content: <HotelForm initialData={initialData} />,
    },
  ];

  return (
    <Fragment>
      <ModificationFormTitle
        title={{
          create: 'Create Accommodation',
          edit: `Edit ${initialData?.title}`,
        }}
        description={{
          edit: 'Update accommodation details and availability.',
          create: 'Create a new accommodation and configure its details.',
        }}
        className="mb-8"
        isEditMode={isEditMode}
      />

      <Tabs {...(isEditMode ? { value: activeTab } : { defaultValue: 'HOUSE' })} className="gap-4">
        <TabsList
          className={clsx(
            'gap-1 rounded-lg! border border-zinc-200! bg-zinc-100 group-data-[orientation=horizontal]/tabs:h-fit',
            'dark:border-zinc-700! dark:bg-zinc-950/70',
          )}
        >
          {tabs.map(({ icon: Icon, name, value }) => (
            <TabsTrigger
              key={value}
              value={value}
              className="flex flex-col items-center gap-1 pt-2 pb-1 not-disabled:cursor-pointer sm:px-5"
              disabled={isEditMode}
            >
              <Icon className="size-5" />
              {name}
            </TabsTrigger>
          ))}
        </TabsList>

        {tabs.map((tab) => (
          <TabsContent key={tab.value} value={tab.value} className="relative">
            {tab.content}
          </TabsContent>
        ))}
      </Tabs>
    </Fragment>
  );
};
