export type ActivityType = {
  id: string;
  name: string;
  icon: string;
  title: string;
};

export type ActivityTypeListProps = {
  selectedActivityTypeId: string;
  activityTypes?: ActivityType[];
  onActivityTypeChange: (activityTypeId: string) => void;
};

export type GetActivityTypesResponse = Promise<{
  city: string;
  activityTypes: ActivityType[];
}>;
