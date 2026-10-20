export type ActivityTypeItemProps = {
  id: string;
  icon: string;
  title: string;
  selectedActivityTypeId: string;
  onActivityTypeChange: (activityTypeId: string) => void;
};
