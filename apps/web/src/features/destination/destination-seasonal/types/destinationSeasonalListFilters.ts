import { SeasonEnum } from '@/enums/season';

export type DestinationSeasonalListFiltersProps = {
  selectedSeason: SeasonEnum;
  onSeasonChange: (season: SeasonEnum) => void;
};