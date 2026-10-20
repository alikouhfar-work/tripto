export type AccommodationTypeFilterProps = {
  onChange: (value: string) => void;
};

export type AreaFilterProps = {
  onToggle: (key: string, value: string, allValues: string[]) => void;
};

export type ReviewScoreFilterProps = {
  onToggle: (key: string, value: string, allValues: string[]) => void;
};

export type AccommodationClassificationFilterProps = {
  onToggle: (key: string, value: string, allValues: string[]) => void;
};

