import { SeasonEnum } from '@/enums/season';

export type DestinationSeasonalListFiltersProps = {
  season: SeasonEnum;
  onSeasonChange: (season: SeasonEnum) => void;
};