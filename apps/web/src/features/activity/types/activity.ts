export type ActivityEmptyProps = {
  city: string;
};

export type Activity = {
  id: string;
  title: string;
};

export type GetActivitiesResponse = Promise<Activity[]>;
